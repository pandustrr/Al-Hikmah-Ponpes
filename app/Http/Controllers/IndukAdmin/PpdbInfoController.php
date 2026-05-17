<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\PpdbInfo;
use Illuminate\Http\Request;

class PpdbInfoController extends Controller
{
    public function upsert(Request $request, $lembagaId)
    {
        $validated = $request->validate([
            'description'       => 'nullable|string',
            'contact_number'    => 'nullable|string|max:30',
            'contact_persons'   => 'nullable|array',
            'contact_persons.*.name'   => 'required|string|max:100',
            'contact_persons.*.number' => 'required|string|max:30',
            'registration_link' => 'nullable|string|max:500',
            'is_active'         => 'boolean',
            'is_open'           => 'boolean',
        ]);

        PpdbInfo::updateOrCreate(
            ['lembaga_id' => $lembagaId],
            array_merge($validated, ['lembaga_id' => $lembagaId])
        );

        return back()->with('success', 'Info PPDB berhasil disimpan.');
    }
}
