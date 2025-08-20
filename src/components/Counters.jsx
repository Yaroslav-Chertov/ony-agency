const Counters = ({ data }) => {
	if (process.env.NODE_ENV === 'development') {
		return '';
	}
	
	return <>
		<script src="https://www.google.com/recaptcha/api.js"></script>

		{'<!-- Yandex.Metrika counter -->'}
		<script type="text/javascript" __raw={`
			(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
			m[i].l=1*new Date();
			for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
			k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
			(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

			ym(80176045, "init", {
					clickmap:true,
					trackLinks:true,
					accurateTrackBounce:true,
					webvisor:true
			});
		`}></script>
		<noscript><div><img src="https://mc.yandex.ru/watch/80176045" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		{'<!-- /Yandex.Metrika counter -->'}

		{/* <!-- Yandex.Metrika counter --> */}
		<script type="text/javascript" __raw={`
			(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
			m[i].l=1*new Date();
			for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
			k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
			(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

			ym(88820670, "init", {
					clickmap:true,
					trackLinks:true,
					accurateTrackBounce:true,
					webvisor:true
			});
		`}></script>
		<noscript><div><img src="https://mc.yandex.ru/watch/88820670" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		{'<!-- /Yandex.Metrika counter -->'}

		{'<!-- Top.Mail.Ru counter -->'}
		<script type="text/javascript" __raw={`
			if (window.location.href.includes('.ru')) {
				var _tmr = window._tmr || (window._tmr = []);

				_tmr.push({id: "3320236", type: "pageView", start: (new Date()).getTime()});

				(function (d, w, id) {

				if (d.getElementById(id)) return;

				var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;

				ts.src = "https://top-fwz1.mail.ru/js/code.js";

				var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};

				if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }

				})(document, window, "tmr-code");
			}
		`}>
		</script>
		<noscript><div><img src="https://top-fwz1.mail.ru/counter?id=3320236;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div></noscript>
		{'<!-- /Top.Mail.Ru counter -->'}

		{/* <!-- <script type="text/javascript">!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("VK-RTRG-1608054-16Sjx"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script><noscript><img src="https://vk.com/rtrg?p=VK-RTRG-1608054-16Sjx" style="position:fixed; left:-999px;" alt=""/></noscript> --> */}

		{/* <script __raw={`
			(function(w, d, s, h, id) {
				w.roistatProjectId = id; w.roistatHost = h;
				var p = d.location.protocol == "https:" ? "https://" : "http://";
				var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init?referrer="+encodeURIComponent(d.location.href);
				var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
			})(window, document, 'script', 'cloud.roistat.com', '94e715edffefd825dd918df5873370cd');
		`}></script> */}
		{/* <!-- Roistat Counter End --> */}
	</>
};

export default Counters;
