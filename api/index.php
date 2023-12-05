<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

include 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // GET REQUESTS
  case 'GET':
    $get_action = isset($_GET['action']) ? $_GET['action'] : '';
    switch ($get_action) {
      case 'get_current_user':
        $response = getCurrentUser();
        break;
      case 'get_cities':
        $response = getCities();
        break;
      case 'get_all_departments':
        $response = getAllDepartments();
        break;
      case 'get_grouped_cities':
        $response = getGroupedCities();
        break;
      case 'get_grouped_concessions':
        $response = getGroupedConcessions();
        break;
      case 'get_concessions':
        $response = getConcessions();
        break;
      case 'get_sales_boss_concessions':
        $username = isset($_GET['username']) ? $_GET['username'] : '';
        $response = getSalesBossConcessions($username);
        break;
      default:
        if ($get_action == '') {
          $response = 'Get action not specified. Please add an action type to the request.';
        } else {
          $response = 'Get action "' . $get_action . '" does not exist in the API.';
        }
        break;
    }

    echo json_encode($response);
    break;

    // POST REQUESTS
  case 'POST':
    $post_action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($post_action) {
      default:
        if ($post_action == '') {
          $response = 'POST action not specified. Please add an action type to the request.';
        } else {
          $response = 'POST action "' . $post_action . '" does not exist in the API.';
        }
        break;
    }

    echo json_encode($response); // return $response
    break;
}
