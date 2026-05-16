<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'lembaga' => 'nullable|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'image_url' => 'nullable|string',
        ]);

        Event::create($validated);

        return back()->with('success', 'Event berhasil ditambahkan.');
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'lembaga' => 'nullable|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'image_url' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        $event->update($validated);

        return back()->with('success', 'Event berhasil diperbarui.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return back()->with('success', 'Event berhasil dihapus.');
    }
}
