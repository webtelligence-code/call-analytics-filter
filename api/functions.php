<?php

include '../DatabaseConnect.php';
include 'session.php';

$databaseObj = new DatabaseConnect;
$conn = $databaseObj->connect();

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GET////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function that will user's session data
function getCities()
{
  global $conn;

  $departamento = $_SESSION['DEPARTAMENTO'];

  $sql = "SELECT cidade FROM tbconcessoes WHERE GerentePosVenda = ? ORDER BY cidade";

  if ($departamento == 'Informática' || $departamento == 'Contact Center' || $departamento == 'Administrativo') {
    $sql = "SELECT cidade FROM tbconcessoes ORDER BY cidade";
    $stmt = $conn->prepare($sql);
  } else {
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $_SESSION['USERNAME']);
  }
  
  $stmt->execute();
  $result = $stmt->get_result(); 

  $cities = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $cities[] = $row['cidade'];
    }
    $cities = array_values(array_unique($cities)); // Remove duplicates
  } else {
    echo "No data found";
  }

  return $cities;
}


function getAllDepartments()
{
  global $conn;

  $sql = "SELECT departamento FROM tbusers ORDER BY departamento";

  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result();

  $departments = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $departments[] = $row['departamento'];
    }
    $departments = array_values(array_unique($departments)); // Remove duplicates
  } else {
    echo "No data found";
  }

  return $departments;
}

// Function that will fetch all users (guests) from the database
function getConcessions()
{
  global $conn;

  $departamento = $_SESSION['DEPARTAMENTO'];

  $sql = "SELECT concessao FROM tbconcessoes WHERE GerentePosVenda = ? ORDER BY concessao";

  if ($departamento == 'Informática' || $departamento == 'Contact Center' || $departamento == 'Administrativo') {
    $sql = "SELECT concessao FROM tbconcessoes ORDER BY concessao";
    $stmt = $conn->prepare($sql);
  } else {
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $_SESSION['USERNAME']);
  }

  $stmt->execute();
  $result = $stmt->get_result();

  $concessions = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $concessions[] = $row['concessao'];
    }
    $concessions = array_values(array_unique($concessions)); // Remove duplicates
  } else {
    echo "No data found";
  }

  return $concessions;
}

function getCurrentUser()
{
  global $conn;

  $sql = "SELECT * FROM tbusers 
          WHERE username = ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $_SESSION['USERNAME']);
  $stmt->execute();
  $result = $stmt->get_result();
  $user = $result->fetch_assoc();

  return $user;
}

function getSalesBossConcessions($username)
{
  global $conn;
  $sql = "SELECT concessao FROM tbconcessoes 
          WHERE GerentePosVenda = ?
          OR DiretorPosVenda = ?
          OR GerenteConcessao = ?
          GROUP BY concessao";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $username, $username);
  $stmt->execute();
  $result = $stmt->get_result();

  $concessions = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $concessions[] = $row;
    }
  } else {
    echo "No data found";
  }

  return $concessions;
}
