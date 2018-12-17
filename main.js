$('document').ready(function() {

    /*----- helper functions  ------*/
   function createElementWithAttributes(element,attributes,parent) {
       return $(element,attributes).appendTo(parent)
   }

   function getVisibleTabsCount() {
     var tabCount = $('#myTab').children().each((index,value) => {
                            console.log($(this).attr("style"));
                    });
   }

   function updateTabsCount() {
       // getVisibleTabsCount
       // update the dom inner html with tab + count.
   }

   function mobileView() {
        if ($(window).width() < 640) {
            $('.ellipsis').show();
            // rearrangeTabsAndNavs();
        } else {
            $('.ellipsis').hide();
        }
   }

   /*----   ----*/
    function createTabContent(tabCount) {

        createElementWithAttributes('<div></div>',
                                    {class:'tab-pane fade',
                                    id:'tab'+tabCount,
                                    role: 'tabpanel',
                                    text: 'tab ... '+tabCount,
                                    'aria-labelledby': 'tab'+tabCount},
                                    '#myTabContent'
                                    ).tab('show').show();

    }

    function createTab() {

        $(window).on("load resize", function() {
            mobileView();
        });

        var tabCount = $('#myTab').children().length+1;

        createElementWithAttributes('<li></li>',
                                    {class:'nav-item', id:'nav-tab-'+tabCount},
                                    '#myTab'
                                    );

        createElementWithAttributes('<a></a>',
                                    {class:'nav-link',
                                    text:'tab-'+tabCount,
                                    id:'tab-'+tabCount,
                                    'data-toggle':'tab',
                                    'href':'#tab'+tabCount,
                                    'role':'tab',
                                    'aria-controls':'tab-'+tabCount,
                                    'aria-selected': 'true',},
                                    '#nav-tab-'+tabCount
                                    );

        createElementWithAttributes('<span></span>',
                                    {class: 'close',
                                    'data-id': 'tab-'+tabCount,
                                    'aria-hidden': 'true',
                                    text: 'x',},
                                    '#tab-'+tabCount
                                    ).click(function() {
                                        var tab = $(this).attr('data-id');
                                        $('#'+tab).hide();

                                        $('#tab-1').tab('show');
                                        $('#tab-1').show();
                                    });

        createTabContent(tabCount);

    }

    function createNavItem(navCount = null) {

        if (navCount == null) {
            var navCount = ( $('#myTab').children().length+1 ) + ( $('.sidebar-nav').children().length );
        }

        createElementWithAttributes('<li></li>',
                                    { id:'nav-'+navCount,},
                                    '.sidebar-nav');
        
        createElementWithAttributes('<a></a>',
                                    { href:'#nav'+navCount, id:"nava"+navCount ,text: 'nav-'+navCount},
                                    '#nav-'+navCount);
        
        createElementWithAttributes('<span></span>',{
                                      href:'#',
                                      class: 'close',
                                      'data-id':'nav-'+navCount,
                                      'aria-hidden': 'true',
                                      text: 'x',
                                    },'#nava'+navCount
                                    ).click(function() {
                                        var tab = $(this).attr('data-id');
                                        $('#'+tab).hide();

                                        $('#tab-1').tab('show');
                                        $('#tab-1').show();
                                    });

    }

    function rearrangeTabsAndNavs() {
        var tabsCount = $('#myTab').children().length;

        if (tabsCount > 5) {
            for (i = 5;i <= tabsCount;i++)  {
                $('#tab-'+i).remove();
                createNavItem(i);
            }
        }
        
    }

   $('.addNewTab').click(function() {

       if ($('#myTab').children().length < 15) {  
            createTab();
       } else {
            createNavItem();                    
       }

   });

    /*
        can be used to toggle any sort of tab. 
        note:- add toggleTab class to your attribute with data-id and some magic.
    */
    $('.toggleTab').click(function() {

        var tab = $(this).attr('data-id');
        $('#'+tab).tab('show');
        $('#'+tab).show();

    });

    $('.ellipsis').hide();

    $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
        console.log('newly activated tab', e.target);
        console.log('previous active tab', e.relatedTarget)
    });

    $('.close').click(function() {
        console.log('closing navs');
        var tab = $(this).attr('data-id');
        $('#'+tab).hide();

        $('#tab-1').tab('show');
        $('#tab-1').show();
    });

    /*
        toggle ellipsis based on the viewport. galaxy s5 is 640.
        can be configured more as requirement changes for viewport.
    */
    $(window).on("load resize", function() {
        mobileView();
    });

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

});
