<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestionAnswer extends Model
{
    use HasFactory;

    protected $fillable = ['quiz_question_id', 'quiz_answer_id', 'answer'];
}
