<?php
$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];
$userWords = $_POST['userWords'];
$userCost = $_POST['userCost'];
$userPick = $_POST['userPick'];


// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';
require 'phpMailer/Exception.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'goncharovnikita713@gmail.com';                     // SMTP username
    $mail->Password   = 'HUJIbCOH777';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('goncharovnikita713@gmail.com', 'Никита');
    $mail->addAddress('nikitagonchar777@mail.ru', 'NKH');     // Add a recipient

    // if(!empty($_FILES['attachfile']['name'][0])){
    //     $tempFiles = count($_FILES['attachfile']['name']);
    //      for($i = 0; $i < $tempFiles; $i++){ // получаем количество файлов с массива
    //         if($_FILES['attachfile']['error'][$i] == 0){ // нет ошибки при передаче файла - продолжаем!
    //             if(!$mail->AddAttachment($_FILES['attachfile']['tmp_name'][$i], $_FILES['attachfile']['name'][$i], 'base64', $_FILES['attachfile']['type'][$i])) die ($mail->ErrorInfo);
    //     }
    //     }
    // }


    // for ($ct = 0; $ct <br count($_FILES['userfile']['tmp_name']); $ct++) {
    //     $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['userfile']['name'][$ct]));
    //     $filename = $_FILES['userfile']['name'][$ct];
    //     if (move_uploaded_file($_FILES['userfile']['tmp_name'][$ct], $uploadfile)) {
    //         $mail->addAttachment($uploadfile, $filename);
    //     } else {
    //         $msg .= 'Failed to move file to ' . $uploadfile;
    //     }
    // }

    // Content
    $mail->AddAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);
    $mail->isHTML(true);                                 // Set email format to HTML
    $mail->Subject = 'Заявка с сайта "Мобильный провайдер"';
    $mail->Body    = 
    "Имя пользователя: ". $userName. "<br>".
    "Номер телефона: ". $userPhone. "<br>".
    "E-mail: ". $userEmail. "<br>".
    "Комментарий: ". $userWords. "<br>".
    "Цена: ". $userCost. "<br>".
    "Выбранные пункты: ". $userPick. "<br>";


    $mail->send();
    echo 'Успешно отправлено';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}