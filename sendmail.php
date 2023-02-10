<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

   require 'phpmailer/src/Exception.php';
   require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('borisolchik@gmail.com', 'Новый участник');
    $mail->addAddress('olya_boris97@mail.ru');
    $mail->Subject = 'Новая заявка!';

    $body = '<h1>Новая заявка на участие в семинаре!</h1>';

    if (trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if (trim(!empty($_POST['email']))) {
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if (trim(!empty($_POST['seminar']))) {
        $body.='<p><strong>Семинар:</strong> '.$_POST['seminar'].'</p>';
    }

    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'Ошибка отправки';
    } else {
        $message = 'Ваша заявка успешно отправлена и находится в обработке. Ожидайте email с подтверждением бронирования.';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>




