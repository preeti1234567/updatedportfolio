$(".navigation").on('click',showPage);

getContent("aboutMe");

function showPage(){
    var url = $(this).attr('value');
    getContent(url);
}

function getContent(url)
{
    var resume = $('#resume');
    var content = $('#contentFrame')
    $(content).empty();
    if(url === 'resume')
    {
        resume.show();
    }
    else
    {
        $(content).empty();
        resume.hide();
        $.ajax({ method: "GET", url: "/"+url }).then(
        function (data) {
            content.append(data);
        }
        );
    }
}
