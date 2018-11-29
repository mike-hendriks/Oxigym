<?php

namespace App\Http\Controllers;

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class FirebaseController extends Controller
{

//

    public function index()
    {

        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/reboot-abaa4-3303be45ce5c.json');

        $firebase = (new Factory)

            ->withServiceAccount($serviceAccount)

            ->withDatabaseUri('https://reboot-abaa4.firebaseio.com/')

            ->create();

        $database = $firebase->getDatabase();

        $newPost = $database

            ->getReference('blog/posts')

            ->push([

                'title' => 'Post title',

                'body' => 'This should probably be longer.',

            ]);

//$newPost->getKey(); // => -KVr5eu8gcTv7_AHb-3-

//$newPost->getUri(); // => https://my-project.firebaseio.com/blog/posts/-KVr5eu8gcTv7_AHb-3-

//$newPost->getChild('title')->set('Changed post title');

//$newPost->getValue(); // Fetches the data from the realtime database

//$newPost->remove();

        echo "<pre>";

        print_r($newPost->getvalue());

    }

}
