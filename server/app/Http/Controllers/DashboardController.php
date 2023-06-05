<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuizAnswerResource;

use App\Http\Resources\QuizResourceDashboard;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();


        $total = Quiz::query()->where('owner_id', $user->id)->count();


        $latest = Quiz::query()->where('owner_id', $user->id)->latest('created_at')->first();


        $totalAnswers = QuizAnswer::query()
            ->join('quizzes', 'quiz_answers.quiz_id', '=', 'quizzes.id')
            ->where('quizzes.owner_id', $user->id)
            ->count();

        // Latest 5 answer
        $latestAnswers = QuizAnswer::query()
            ->join('quizzes', 'quiz_answers.quiz_id', '=', 'quizzes.id')
            ->where('quizzes.owner_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('quiz_answers.*');

        return [
            'totalQuizzes' => $total,
            'latestQuiz' => $latest ? new QuizResourceDashboard($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => QuizAnswerResource::collection($latestAnswers)
        ];
    }
}
