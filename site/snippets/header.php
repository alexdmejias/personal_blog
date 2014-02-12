<!doctype html>

<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"><!--<![endif]-->

<head>
	<meta charset="utf-8">

	<?php // Google Chrome Frame for IE ?>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title><?php echo html($site->title()) ?> - <?php echo html($page->title()) ?></title>

	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

	<meta name="description" content="<?php echo html($site->description()) ?>" />
    <meta name="keywords" content="<?php echo html($site->keywords()) ?>" />
    <meta name="robots" content="index, follow" />

	<link href='http://fonts.googleapis.com/css?family=IM+Fell+English:400italic,400' rel='stylesheet' type='text/css'>

	<?php echo css('assets/css/styles.css') ?>

</head>

<body>

	<header class="header" role="banner">
		<div>
			<h1 class="h5"><a href="<?php echo url() ?>"><?php echo html($site->title()) ?></a></h1>
		</div>
		<?php snippet('menu'); ?>
	</header>