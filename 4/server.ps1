# Simple PowerShell HTTP Server using .NET HttpListener
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "HTTP Server started successfully. Listening on http://localhost:$port/"
    Write-Host "Press Ctrl+C to stop the server."
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }
        
        # Strip leading slash and combine with workspace root path
        $cleanPath = $urlPath.TrimStart('/')
        $localPath = Join-Path (Get-Location) $cleanPath
        
        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = "application/octet-stream"
            
            if ($ext -eq ".html" -or $ext -eq ".htm") {
                $contentType = "text/html; charset=utf-8"
            } elseif ($ext -eq ".css") {
                $contentType = "text/css"
            } elseif ($ext -eq ".js") {
                $contentType = "application/javascript"
            } elseif ($ext -eq ".png") {
                $contentType = "image/png"
            } elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") {
                $contentType = "image/jpeg"
            } elseif ($ext -eq ".svg") {
                $contentType = "image/svg+xml"
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Stop()
    $listener.Close()
}
