<section class="content wrap">
	<h2 class="title"><?php echo html($page->title()) ?></h2>

	<article>
	<?php echo kirbytext($page->text()) ?>

	<?php
		if($page->hasChildren() ) {
			$children = $page->children();
			echo '<div class="projects clearfix">';
			foreach ($page->children() as $key) {
				echo
					'<div class="project" style="background-image:url(http://lorempixel.com/200/300/abstract)" ><a href="'. $key->url() .'"> '.
					'<h5>'.$key->title.'</h5>'.
					'<p>'.$key->excerpt.'</p>'.
					'</a></div>';
			}
			echo '</div>';
		}
	?>

	</article>

	<?php snippet('prevnext'); ?>


</section>