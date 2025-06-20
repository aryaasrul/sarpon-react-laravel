<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you can configure the settings for cross-origin resource sharing
    | or "CORS". This determines which origins are allowed to access your
    | application's API.
    |
    */

    'paths' => [
        'api/*',
        'login',
        'logout',
        'sanctum/csrf-cookie'
    ],

    'allowed_methods' => ['*'],

    // Izinkan permintaan HANYA dari URL frontend Anda
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // PENTING: Ini harus 'true' agar otentikasi berbasis cookie berfungsi
    'supports_credentials' => true,

];
