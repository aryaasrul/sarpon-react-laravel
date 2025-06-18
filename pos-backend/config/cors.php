<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'], // PASTIKAN INI LENGKAP

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'], // PASTIKAN INI BENAR

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // PASTIKAN INI TRUE

];
