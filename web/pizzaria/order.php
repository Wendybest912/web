<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
        if($_POST){
            $price = 0;

            define("PRIX_PIZZA1", 10);
            define("PRIX_PIZZA2", 10);
            define("PRIX_PIZZA3", 10);
            define("PRIX_PIZZA4", 10);
            define("PRIX_PIZZA5", 10);

            $pricePizza = ["Apple" => PRIX_PIZZA1, "Banana"=> PRIX_PIZZA2, "Cherry"=> PRIX_PIZZA3, "Date"=> PRIX_PIZZA4, "Elderberry"=> PRIX_PIZZA5];

            #echo $_POST['firstName'] . $_POST['lastName'] . " a commandé au " . $_POST['rue'] . " ".$_POST['ville'] . " ";
            foreach ($pricePizza as $pizza => $price){
                foreach ($_POST['pizza'] as $pizzaCommand){
                    if ($pizzaCommand == $pizza) {
                        $price += $price;
                    }
                }
            }
            echo $price;
        }
        
    ?>
    <div id="topbar">
            <nav>
                <ul>
                    <li><a href="default.asp">Home</a></li>
                    <li><a href="news.asp">News</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="about.asp">About</a></li>
                </ul>
            </nav>
        </div>

        <div id="row2">
            <h1>The Best Pizza with fruits</h1>
            <h2>The enemy of italians</h2>
            <div>
                <nav >
                    <ul id="nav2">
                        <li><a href="default.asp">Popular</a></li>
                        <li><a href="news.asp">Hot news</a></li>
                        <li><a href="contact.asp">lorem</a></li>
                    </ul>
                </nav>
            </div>
        </div>

        <div id="posts-container">
        </div>

    <form method="POST">
        


        <div>
            <label for="firstName">Prénom : </label>
            <input type="text" id="firstName" name="firstName" placeholder="Votre Prénom" required />
        </div>

        <div>
            <label for="lastName">Nom : </label>
            <input type="text" id="lastName" name="lastName" placeholder="Votre Nom" required/>
        </div>

        <div>
            <label for="rue">rue</label>
            <input type="text" id="rue" name="rue" placeholder="rue" required>

            <label for="codePostal">code postal</label>
            <input type="text" id="codePostal" name="codePostal" placeholder="code postal" required>

            <label for="ville">ville</label>
            <input type="text" id="ville" name="ville" placeholder="ville" required>
        </div>

        <div>
            <label for="pizza">Choose pizza:</label>
            <select id="pizza" name="pizza" multiple>
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="cherry">Cherry</option>
                <option value="date">Date</option>
                <option value="elderberry">Elderberry</option>
            </select>
        </div>

        <input type="submit" value="submit" id="submit"/>
        <input type="reset" value="reset" id="reset"/>
    </form>
</body>
</html>