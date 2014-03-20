<section class="content wrap">
	<h2 class="title">
		<?php echo html($page->title()) ?>
		<?php
			$children = $page->children()->visible();
		?>
	</h2>
	<article>
		<?php

			echo kirbytext($page->text());

			foreach ($children as $child) {

				echo '<h3 id="'.strtolower(str_replace(' ', '_', $child->title)).'">'.$child->title.'</h3>';
				echo kirbytext($child->text());

				echo '<div class="projects clearfix">';

				foreach ($child->children()->visible() as $grandchild) {
					echo
						'<div class="project" style="background-image:url('. $grandchild->thumbnail .')" ><a href="'. $grandchild->url() .'"> '.
						'<h5>'.$grandchild->title.'</h5>'.
						'<p>'.$grandchild->excerpt.'</p>'.
						'</a> </div>';
				}

				echo '<hr /></div>';
			}
		?>

	</article>

	<?php snippet('prevnext'); ?>


</section>