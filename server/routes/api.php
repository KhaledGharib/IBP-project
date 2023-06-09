<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('quiz', QuizController::class);
    Route::apiResource('/users', UserController::class);
    Route::get('/quiz/get-by-slug/{quiz:slug}', [QuizController::class, 'getBySlug']);
    Route::post('/quiz/{quiz}/answer', [QuizController::class, 'storeAnswer']);

    Route::apiResource('announcements', \App\Http\Controllers\AnnouncementController::class);
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });



    Route::get('/dashboard', [DashboardController::class, 'index']);
});


Route::post('messages', [ChatController::class, 'message']);

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
