<?php
if(!isset($_GET)){
    die("error: no valid entry");
}

function GetData(){

    // for retrieving people/planets/starships names only
    if(isset($_GET['dataType']) ){
        if(!($_GET['dataType']=='people' || $_GET['dataType']=='planets' || $_GET['dataType']=='starships' )){
            throw new Exception("not a valid data type");
        }
        $url = "http://swapi.co/api/".$_GET['dataType']."/?format=json";
        $data = file_get_contents($url);
        $resultsArr = json_decode($data,true);
        $allEntries = json_decode("{}");
        $index=0;
        
        do{ // checks all pages of data
            $data = file_get_contents($url);
            $resultsArr = json_decode($data,true);
            foreach($resultsArr['results'] as $entry){
                $allEntries->$index = $entry['name'];
                $index++;
            }
            $url = $resultsArr['next'];
        }while(isset($resultsArr['next']));
        
       echo (json_encode($allEntries,JSON_PRETTY_PRINT));

    }else if(isset($_GET['search'])){ // for searching for a person 

        $searchUrl = "http://swapi.co/api/people?search=".$_GET['search']."&format=json";
        $response = file_get_contents($searchUrl);
        $resultJson= json_decode($response,true);
        $result = $resultJson[ "results" ][0] ;
        
       echo (json_encode($result,JSON_PRETTY_PRINT));
    }else{
         die("error: no valid entry");
    }

}

try{
    GetData();
}catch(Exception $e){
    echo 'Message: ' .$e->getMessage();
}


?>