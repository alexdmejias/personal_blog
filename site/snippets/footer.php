		<footer class="ta_center wrap" role="contentinfo">

			<?php snippet('social-icons'); ?>
			<p>&copy; <?php echo date('Y'); ?> Alex Mejias.</p>

		</footer>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
		<script>
			if (!window.jQuery) {
				document.write('<script src="/assets/js/jquery-2.1.0.min.js"><\/script>');
			}
		</script>

		<?php echo js('assets/js/scripts'.$site->env_vars->js_type.'.js') ?>
	</body>

</html>