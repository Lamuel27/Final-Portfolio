(function(){
	$(window).on('load',function(){

		function snippet(id) {
			jQuery('#' + id + ' .ai-icon').on('click',function(){
				var index = $(this).index();
				var el = document.querySelectorAll('#' + id + ' .ai-icon');
				var code = el[index].innerHTML;
				code  = '<div class="ai-icon">' + code;
				code  = code + '</div>';
				document.querySelector('#code').innerHTML = esc(code);
				jQuery('#copy').html('Copy');
				jQuery('.code-snippet').addClass('active');
				jQuery('.overlay').addClass('active');
			});
		}

		snippet('business');
		snippet('shopping');
		snippet('finance');
		snippet('resume');

		jQuery('.cross').on('click',function(){
			jQuery('.code-snippet').removeClass('active');
			jQuery('.overlay').removeClass('active');
		});

		jQuery('#copy').on('click',function(){
			selectText('code');

			console.log(jQuery(this));

	        try {
                document.execCommand('copy');
                jQuery(this).html('Copied to your clipboard');
            } catch (e) {
            	console.log(e);
            	jQuery(this).html('Ctrl + C / Cmd + C');
            }
		});

		function esc(str){
		  str = str.replace(/&/g, "&amp;");
		  str = str.replace(/>/g, "&gt;");
		  str = str.replace(/</g, "&lt;");
		  str = str.replace(/"/g, "&quot;");
		  str = str.replace(/'/g, "&#039;");
		  return str;
		}

		function selectText(element) {
		    var doc = document
	            , text = doc.getElementById(element)
	            , range, selection
	        ;    
	        if (doc.body.createTextRange) {
	            range = document.body.createTextRange();
	            range.moveToElementText(text);
	            range.select();
	            range.execCommand('copy');
	        } else if (window.getSelection) {
	            selection = window.getSelection();        
	            range = document.createRange();
	            range.selectNodeContents(text);
	            selection.removeAllRanges();
	            selection.addRange(range);
	        }
		}

	});
})();