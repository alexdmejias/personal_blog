<section class="content wrap-narrow">
	<h2 class="title"><?php echo html($page->title()) ?>
		<span>
			<a class="button fz-half italic" href="assets/alexmejias-resume.pdf">View As PDF</a>
		</span>
	</h2>

	<article class="clearfix">
		<div class="personal_info clearfix">
			<h3>Alex Mejias</h3>
			<h4>
				alex@alexdmejias.com<br>
				(516) 748 - 6801
			</h4>
			<h4>
				alexdmejias.com<br>
				github.com/amejias101
			</h4>
		</div>
		<?php echo kirbytext($page->text()) ?>
	</article>

</section>