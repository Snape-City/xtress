
const htmlFile = `<head>
<script
src="https://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>
</head>
<body>
<header>
<h1>Measuring the Performance of Middleware</span></h1>
<h2>Middleware Structure</h2>
</header>
<ul class="list"></ul>
<script type='text/javascript' src='index.js'></script>
</body>`



var fs = require('fs');
fs.writeFile("index2.html", htmlFile, function(err) {
if(err) {
return console.log(err);
}

console.log("The file was saved!");
});
