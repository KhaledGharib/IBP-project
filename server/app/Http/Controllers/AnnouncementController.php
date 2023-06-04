<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnouncementRequest;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use Symfony\Component\HttpFoundation\Request;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection  
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $user = $request->user();

        return AnnouncementResource::collection(
            Announcement::where(function ($query) use ($user) {
                $query->where('owner_id', $user->id)
                    ->orWhereJsonContains('access_users', $user->id);
            })->orderBy('created_at', 'desc')->get()
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
    public function update(UpdateAnnouncementRequest $request, Announcement $announcement)
    {
        $data = $request->validated();
        $announcement->update($data);

        return new AnnouncementResource($announcement);
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
