<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection  
     */
    public function index()
    {
        //
        return AnnouncementResource::collection(

            Announcement::query()->orderBy('id')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnnouncementRequest $request)
    {
        //
        $data = $request->validated();
        $announcement = Announcement::create($data);
        return response(new AnnouncementResource($announcement), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Announcement $announcement)
    {
        //
        return new AnnouncementResource($announcement);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {
        //

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Announcement $announcement)
    {
        //
        $announcement->delete();

        return response('', 204);
    }
}
