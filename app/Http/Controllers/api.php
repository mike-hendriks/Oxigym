<?php

namespace App\Http\Controllers;

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class api extends Controller
{
    // Public API

    // Get the latest workout
    public function get_latest_workout()
    {
        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/reboot-abaa4-3303be45ce5c.json');
        $firebase = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->withDatabaseUri('https://reboot-abaa4.firebaseio.com/')
            ->create();

        $database = $firebase->getDatabase();

        $data = $database->getReference('workout')
        // ->getChild()
        // ->limitToLast(1)
            ->orderByKey()

            ->limitToFirst(1)
        // ->limitToLast(1)
            ->getSnapshot()
            ->getValue();

        print_r($data);

        // return json_encode($data);
    }
}
