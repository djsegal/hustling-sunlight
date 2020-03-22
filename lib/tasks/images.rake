namespace :images do

  @image_template = "
    <!DOCTYPE html>
    <html>
      <head>

        <link href='https://fonts.googleapis.com/css?family=Raleway:700' rel='stylesheet'>

        <style>
          html {
            font-family: 'Raleway', sans-serif;
            text-transform: uppercase;
            font-size: 900%;
            text-align: center;
          }
          body, html, .cs-image {
            width: 1200px;
            height: 1200px;
            vertical-align: middle;
            text-anchor: center;
            margin: 0;
            padding: 0;
            border: 0;
          }
          .cs-box {
            width: 1200px;
            height: 600px;
          }
          .cs-bot {
            padding-top: 75px;
            box-sizing: border-box;
          }
          .cs-top .cs-text {
            vertical-align: bottom;
          }
          .cs-bot .cs-text {
            vertical-align: top;
          }
          .cs-text {
            height: 525px;
            width: 1200px;
            display: table-cell;
          }
          .cs-top {
            color: $1;
            background-color: $2;
          }
          .cs-bot {
            color: $2;
            background-color: $1;
          }
        </style>
      </head>
      <body>
        <div class='cs-image'>
          <div class='cs-box cs-top'>
            <div class='cs-text'><span>$3</span></div>
          </div>
          <div class='cs-box cs-bot'>
            <div class='cs-text'><span>$4</span></div>
          </div>
        </div>
      </body>
  </html>
  "

  desc "TODO"
  task make: :environment do
    Phrase.all.each_with_index do |cur_phrase, cur_index|
      cur_image = @image_template.deep_dup

      cur_image.gsub! "$1", cur_index.even? ? "black" : "white"
      cur_image.gsub! "$2", cur_index.even? ? "white" : "black"
      cur_image.gsub! "$3", cur_phrase.first_word
      cur_image.gsub! "$4", cur_phrase.last_word

      IMGKit.new(
        cur_image, quality: 100
      ).to_file(
        "public/#{cur_phrase.first_word}-#{cur_phrase.last_word}.png"
      )
    end
  end

end
