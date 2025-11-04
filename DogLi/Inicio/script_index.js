			
           

document.body.classList.add('page-loaded');



           if (window.self !== window.top)
			{
				window.top.location.href = window.location.href;
			}            
           
           
         
            
            
            
            
            
            window.dataLayer = window.dataLayer || [];
			
			window.dataLayer.push({
				'language': 'es',
				'country': 'es'
  			});
			
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WZLVLPS');

        
        
        function gtm_event(name, value=null, data={})
			{
				dataLayer.push({
					'event': name,
					'conversionValue': value,
					'data': data
				});
			}
        
		function get_notifications()
		{
			$.get("https://www.perro-perdido.com/user_comments.php", function(data)
			{
				if (data > 0)
				{
					$("#user_comments_desktop").html('<a href="https://www.perro-perdido.com/compte/comments.php?language=es&country=es" class="bi bi-chat-right-text" style="font-size:1rem;" rel="nofollow"><span class="badge badge-pill badge-danger" style="transform: translate(-10px, -50%)">' + data + '</span></a>');
					$("#user_comments_mobile").html('<a href="https://www.perro-perdido.com/compte/comments.php?language=es&country=es" class="d-flex align-items-start" rel="nofollow"><i class="bi bi-chat-right-text h4"></i><span class="badge badge-pill badge-danger" style="transform: translate(-10px, -50%)">' + data + '</span></a>');				
				}
			});
		}


        setTimeout(() => analytic_event({"name":"screen_view"}), 500); 



		



		