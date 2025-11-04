			
           

document.body.classList.add('page-loaded');



           if (window.self !== window.top)
			{
				window.top.location.href = window.location.href;
			}
			/*
			if (document.referrer.indexOf("gproxx.com") != -1)
			{
				window.location = "https://www.perro-perdido.com/es-es/";
    		}
			*/

            
           
           
           function analytic_event(params={})
			{
				if (window.location)
				{
					params['url'] = window.location.href ;
				}

				if (document.referrer)
				{
					params['referrer'] = document.referrer ;
				}

				$.get("https://www.perro-perdido.com/analytic.php", params);
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
        
        
        
        
        
        
        
        
        
        
        $(document).ready(function()
		{
			$.cookie.json = true;
			
			var cookie_user = $.cookie('session');
			
			if (cookie_user)
			{
				if (cookie_user.user)
				{
					$("#user_header").html('<a href="https://www.perro-perdido.com/compte/index.php?language=es&country=es" rel="nofollow">' + cookie_user.user['email'] + '</a>') ;
					$(".user_auth").hide() ;

					// pour que la notification ne s'affiche pas avant que le compteur de vue soit màj sur la page d'une annonce
					window.setTimeout(get_notifications,5000);	
				}
				else
				{
					$("#user_header").html('<a href="https://www.perro-perdido.com/compte/signin.php?language=es&country=es" rel="nofollow"><i class="bi bi-person"></i> Conexíon</a>') ;
				}
			}
			else
			{
				$("#user_header").html('<a href="https://www.perro-perdido.com/compte/signin.php?language=es&country=es" rel="nofollow"><i class="bi bi-person"></i> Conexíon</a>') ;
			}
			
		});
	
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



	










        