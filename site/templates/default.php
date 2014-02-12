<?php snippet('header') ?>
<?php $body_snippets_path = $_SERVER['DOCUMENT_ROOT']. '/site/snippets/body/'; ?>

<?php
	$template = (isset($page->template->value)? $page->template->value : 'default');

	if ((file_exists($body_snippets_path . '/'. $template .'.php'))) {
		snippet(strtolower('body/'.$template));
	} else {
		snippet(strtolower('body/default'));
	}
?>

<?php snippet('footer') ?>