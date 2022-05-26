<?php

//** CORS **//
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');
//** CORS **//

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a functionß
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


//Load Composer's autoloader
require 'vendor/autoload.php';

function sendEmail($data, $credentials)
{
    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);


    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    // $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.site.com.br';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = $credentials['email'];                     //SMTP username
    $mail->Password   = $credentials['password'];                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('marlon@monkeybranch.dev');
    $mail->addAddress('marlon@monkeybranch.dev', 'Marlon');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Solicitacao de contato via AR Site';
    $mail->Body    = $data['body'];
    $mail->AltBody = 'Nova Solicitacao de contato via AR site, gentileza verificar!';

    $mail->send();
    // echo 'Message has been sent';

    // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

}

function getBodyEmail($params)
{
    list(
        'name' => $name,
        'company' => $company,
        'phone' => $phone,
        'message' => $message,
    ) = $params;

    return <<<HTML
    <h1>Solicitacao de Contato via AR Site</h1>

    <h2> Dados Enviados: </h2>
    <p> Nome: $name </p>
    <p> Empresa: $company </p>
    <p> Telefone: $phone </p>
    <p> Mensagem: $message </p>

    HTML;
}

$credentials = [];
$data = [];
$json = [];
$response = [];

try {
    // Define Credentials environment  Access
    $credentials['email'] = getenv('EMAIL');
    $credentials['password'] = getenv('PASSWORD');

    $json = json_decode(file_get_contents('php://input'), true);
    if (empty($json['name'])) throw new \Exception('error');

    $data['subject'] = 'Solicitação de contato via AR site';
    $data['body']    = getBodyEmail($json);
    $data['altBody'] = 'Nova Solicitação de contato via AR site, gentileza verificar!';
    sendEmail($data, $credentials);
    $response['status'] = 'sucesso';
    $response['message'] = 'Dados enviados com sucesso';
} catch (\Exception $e) {
    $response['status'] = 'error';
    $response['message'] = 'Ocorreu um erro, tente novamente.';

    echo json_encode($response, $e->getMessage());
} finally {
    echo json_encode($response);
    exit;
}
