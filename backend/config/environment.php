<?php

$setEnvVars = function ($envDataLocation) {
    // #### Read File
    if (!is_file($envDataLocation)) {
        return false;
    }
    ob_start();
    include $envDataLocation;
    $envDataAsString = ob_get_clean();
    $envData = json_decode($envDataAsString, true);

    // #### Set Env Vars

    foreach ($envData as $key => $value) {
        putenv("$key=$value");
    }
};

$setEnvVars('back-end/config/.env');
unset($setEnvVars);
