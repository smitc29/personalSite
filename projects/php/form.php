<?php 
error_reporting(-1);


$name = $_POST['name'];
$email = $_POST['email'];
$topic = $_POST['topic']; 
$comments = $_POST['comments'];
$captcha=$_POST['g-recaptcha-response'];
if(!$captcha)
    {
      echo '<h2>Please check the captcha form.</h2>';
      exit;
    } 

$secretKey = "6LcSbFIUAAAAADpn0VQw74Se820EmYIlPbb3DYUf";
        $ip = $_SERVER['REMOTE_ADDR'];
        $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
        $responseKeys = json_decode($response,true);
        if(intval($responseKeys["success"]) !== 1) {
          echo '<h4>Nice try.</h4>';
        } else {
          echo '<h4> </h4>';
        }
    
if(isset($_POST['submit']))
{
$from_add = "submit@webdesignrepo.com"; 
$to_add = "smithchrisgraphics@gmail.com"; 
$subject = "Personal Site";
$message = " Name: $name \n\n Email: $email \n\n Topic: $topic \n\n Message: $comments";
$messageCheck = " Your message to Chris was sent successfully; he'll try to reach you at this email as soon as possible. ";

$headers = 'From: submit@smithchrisgraphics.com' . "\r\n" .
'Reply-To: ' . $email . "\r\n" .
'X-Mailer: PHP/' . phpversion();

if(mail($email,$topic,$messageCheck,$headers)) /* Mail to site guest */
{
    print "<h4>Message sent successfully!</h4>" ;
} 
else
{
    $msg = "ERROR! Message not sent! Error 1.";
    echo $msg;   
}


if(mail($to_add,$subject,$message,$headers)) /* Mail to contact site owner */
{
    /*$msg = "Mail sent.";

    echo $msg; */
    print "<h4>Talk to you soon, $name</h4>" ;
    
    header("Location:http://smithchrisgraphics.com/projects/index.html");

} 
else
{
    $msg = "ERROR! Message not sent! Error 2.";
    echo $msg;   
}


} /* If submit is entered... */

/*print "<p>Talk to you soon $name</p>" ;*/


?>