$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:8000/')
$listener.Start()
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Write-Host "Servidor activo en http://localhost:8000/"

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css' = 'text/css; charset=utf-8'
    '.js' = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.png' = 'image/png'
    '.jpg' = 'image/jpeg'
    '.svg' = 'image/svg+xml'
    '.ico' = 'image/x-icon'
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $relativePath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
        if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = 'index.html' }
        $filePath = [IO.Path]::GetFullPath((Join-Path $root $relativePath))
        $isInsideRoot = $filePath.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)

        if ($isInsideRoot -and (Test-Path $filePath -PathType Leaf)) {
            $bytes = [IO.File]::ReadAllBytes($filePath)
            $extension = [IO.Path]::GetExtension($filePath).ToLowerInvariant()
            $context.Response.ContentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { 'application/octet-stream' }
            $context.Response.StatusCode = 200
        } else {
            $bytes = [Text.Encoding]::UTF8.GetBytes('404 - Archivo no encontrado')
            $context.Response.ContentType = 'text/plain; charset=utf-8'
            $context.Response.StatusCode = 404
        }

        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $context.Response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
