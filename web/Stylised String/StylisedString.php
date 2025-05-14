<?php
    class StylizedString {
        private $myString;
    
        public function __construct($myString) {
            $this->setString($myString);
        }

        public function setString($myString) {
            $this->myString = $myString;
        }
    
        public function bold() {
            return "<b>" . $this->myString . "</b>";
        }
    
        public function italic() {
            return "<i>" . $this->myString . "</i>";
        }
    
        public function underline() {
            return "<u>" . $this->myString . "</u>";
        }
    
        public function majuscules() {
            return strtoupper($this->myString);
        }
    }

    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $string = new StylizedString("we love chartreuse");

        echo $string->bold() . "<br>";
        echo $string->italic() . "<br>";
        echo $string->underline() . "<br>";
        echo $string->majuscules() . "<br>";

    ?>
</body>
</html>