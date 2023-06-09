<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quiz_question_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\QuizQuestion::class, 'quiz_question_id');
            $table->foreignIdFor(\App\Models\QuizAnswer::class, 'quiz_answer_id');
            $table->foreignIdFor(\App\Models\User::class, 'attempted_id')->nullable();
            $table->text('answer');
            $table->text("result")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations. 
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quiz_question_answers');
    }
};
