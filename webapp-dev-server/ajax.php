<?php

$arr = [
  "error" => false,
  "response" => [
    "count" => 6,
    "items" => [
      0 => [ "id" => 0, "var" => "tururururu" ],
      1 => [ "id" => 0, "var" => "tururururu" ],
      2 => [ "id" => 0, "var" => "tururururu" ],
      3 => [ "id" => 0, "var" => "tururururu" ],
      4 => [ "id" => 0, "var" => "tururururu" ],
      5 => [ "id" => 0, "var" => "tururururu" ],
      6 => [ "id" => 0, "var" => "tururururu" ],
    ]
  ],
  "request" => [
    "do" => "ajaxdemo",
    "who" => [ 4, 6, 11, 32 ]
  ]
];
echo json_encode($arr);