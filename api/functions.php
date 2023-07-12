<?php

include '../DatabaseConnect.php';
include 'session.php';

$databaseObj = new DatabaseConnect;
$conn = $databaseObj->connect();

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GET////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function that will user's session data

// Function that will fetch all users (guests) from the database
function getConcessions()
{
  global $conn;

  $sql = "SELECT concessao FROM tbconcessoes WHERE GerentePosVenda = ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $_SESSION['USERNAME']);
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
