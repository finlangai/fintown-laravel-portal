<?php

namespace App\Http\Controllers;

use OpenApi\Attributes\Info;
use OpenApi\Attributes\SecurityScheme;
use OpenApi\Attributes\Server;

#[
Info(version: "1.0.0", description: "API document", title: "FinTown Laravel Portal API"),
Server(url: '/api', description: "server"),
SecurityScheme(securityScheme: "bearerAuth", type: "http", name: "Authorization", in: 'header', scheme: "bearer")
 ]
abstract class Controller
{
    //
}
