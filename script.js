$(document).ready(function(){
    $(".globe iconify-icon").hide(); 
    $(".continent:first").addClass("focused");
    updateContinentDetails($(".continent:first").data("continent"));

    window.showcapital = function(e) {
        $(e).find('.capital').slideToggle();
        let $icon = $(e).find('iconify-icon');
        if ($icon.hasClass('rotated')) {
            $icon.removeClass('rotated').css('transform', 'rotate(0deg)');
            $icon.removeClass('transit').css('transition', 'all 0.5s ease');
        } else {
            $icon.addClass('rotated').css('transform', 'rotate(180deg)');
        }
    }

    $(".continent").click(function(){
        var continent = $(this).data("continent");
        $(".globe .name").hide();
        $(".globe iconify-icon").hide(); 
        $(".continent iconify-icon").hide(); 
        $("#" + continent + " .name").show();
        $("#" + continent + " iconify-icon").show();
        $(this).find('iconify-icon').show();
        var continentName = $(this).text().trim();
        $('.continent-name').text(continentName);
        fetchCountriesByContinent(continent);
    });

    function updateContinentDetails(continent) {
        $(".globe .name").hide();
        $(".globe iconify-icon").hide();
        $(".continent iconify-icon").hide();

        // Show the details for the specified continent
        $("#" + continent + " .name").show();
        $("#" + continent + " iconify-icon").show();
        
        // Update the continent name in the designated area
        var continentName = $("#" + continent).text().trim();
        $('.continent-name').text(continentName);
        $(".continent:first").addClass("focused").find('.name, iconify-icon').show();
        fetchCountriesByContinent(continent);
    }            
});

function fetchCountriesByContinent(continent) {
    const url = `https://restcountries.com/v3.1/region/${continent}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Log the response to check its structure
            
            if (Array.isArray(data)) {
                const countries = data.map(country => ({
                    name: country.name.common,
                    capital: country.capital ? country.capital[0] : "No Capital"
                }));
                displayCountries(countries);
            } else {
                console.error("Unexpected response format:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function displayCountries(countries) {
    const countryList = $(".country-box");
    countryList.empty(); 

    countries.forEach(country => {
        const countryItem = `<div class="country" onclick="showcapital(this)">
                                <div class="country-name"><div class="text">${country.name}</div> <iconify-icon icon="fluent:ios-arrow-24-filled"></iconify-icon></div>
                                <div class="capital">${country.capital}</div>
                            </div>`;
        countryList.append(countryItem);
    });
}
