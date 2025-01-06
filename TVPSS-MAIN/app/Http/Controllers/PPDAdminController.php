<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SchoolInfo;
use App\Models\TVPSSVersion;
use App\Enums\ApprovalStatusEnum;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PPDAdminController extends Controller
{
    public function tvpssInfoPPDList(Request $request)
    {
        $user = $request->user();

        if (!$user->district) {
            return Inertia::render('3-PPDAdmin/SchoolVersionStatus/listSchool', [
                'schools' => [],
                'message' => 'No schools found for your district.',
            ]);
        }

        $schools = SchoolInfo::where('district', $user->district)
            ->with(['schoolVersion' => function ($query) {
                $query->select('id', 'school_info_id', 'version', 'status');
            }])
            ->get()
            ->map(function ($school) {
                return [
                    'schoolCode' => $school->schoolCode,
                    'schoolName' => $school->schoolName,
                    'schoolOfficer' => $school->schoolOfficer,
                    'district' => $school->district,
                    'schoolVersion' => $school->schoolVersion->version ?? '-',
                    'status' => $school->schoolVersion->status ?? 'Null',
                ];
            });

        return Inertia::render('3-PPDAdmin/SchoolVersionStatus/listSchool', [
            'schools' => $schools,
        ]);
    }

    public function tvpssInfoPPDView(string $schoolCode)
    {
        $school = SchoolInfo::with('schoolVersion')->where('schoolCode', $schoolCode)->first();

        if (!$school) {
            return redirect()->route('schoolInfo.tvpssInfoPPDList')->with('error', 'School not found.');
        }

        $currentVersion = $school->schoolVersion->version?->value ?? 0;

        $tvpssData = [
            'schoolName' => $school->schoolName . " (" . $school->schoolCode . ")",
            'schoolCode' => $school->schoolCode,
            'officer' => $school->schoolOfficer,
            'info' => [
                //'tvpssLogo' => $school->schoolVersion->tvpssLogo,
                'isTvpssLogo' => $school->schoolVersion->isTvpssLogo ?? 'TIADA',
                'studio' => $school->schoolVersion->tvpssStudio ?? 'TIADA',
                'youtube' => $school->schoolVersion->isUploadYoutube ?? 'TIADA',
                'inSchoolRecording' => $school->schoolVersion->recInSchool ?? 'TIADA',
                'outSchoolRecording' => $school->schoolVersion->recInOutSchool ?? 'TIADA',
                'collaboration' => $school->schoolVersion->isCollabAgency ?? 'TIADA',
                'greenScreen' => $school->schoolVersion->greenScreen ?? 'TIADA',
            ],
            'currentVersion' => $currentVersion,
            'nextVersion' => $currentVersion < 4 ? $currentVersion + 1 : 'Versi Dipenuhi',
        ];

        $debugData = [
            'schoolCode' => $schoolCode,
            'school' => $school->toArray(),
        ];

        return Inertia::render('3-PPDAdmin/SchoolVersionStatus/approvePPDTvpss', [
            'tvpssData' => $tvpssData,
            'debug' => $debugData, 
        ]);
    }

    public function approveTVPSS(Request $request, string $schoolCode)
    {
        $school = SchoolInfo::where('schoolCode', $schoolCode)->firstOrFail();
        $schoolVersion = $school->schoolVersion;

        if (!$schoolVersion) {
            return redirect()
                ->route('schoolInfo.tvpssInfoPPDList')
                ->with('error', 'TVPSS Version not found for the given school.');
        }

        $schoolVersion->ppd_approval = true; 
        $schoolVersion->status = ApprovalStatusEnum::PENDING;
        $schoolVersion->save();

        return redirect()->route('schoolInfo.tvpssInfoPPDList')
            ->with('success', 'TVPSS Version successfully approved!');
    }

    public function rejectTVPSS(Request $request, string $schoolCode)
    {
        $school = SchoolInfo::where('schoolCode', $schoolCode)->firstOrFail();
        $schoolVersion = $school->schoolVersion;

        if (!$schoolVersion) {
            return redirect()
                ->route('schoolInfo.tvpssInfoPPDList')
                ->with('error', 'TVPSS Version not found for the given school.');
        }

        $schoolVersion->ppd_approval = false; 
        $schoolVersion->status = ApprovalStatusEnum::REJECTED->value; 
        $schoolVersion->save();

        return redirect()
            ->route('schoolInfo.tvpssInfoPPDList')
            ->with('error', 'TVPSS Version has been rejected.');
    }

    public function destroy(string $id)
    {
        //
    }

    public function equipmentManagementPPD()
    {
        return Inertia::render('3-PPDAdmin/ManageSchoolEquipment/listSchoolEq');
    }
}
