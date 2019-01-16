#############################################################################
#
# Modified version of jekyllrb Rakefile
# https://github.com/jekyll/jekyll/blob/master/Rakefile
#
#############################################################################

require 'rake'
require 'date'

USERNAME = "PincongBackup"
REPO = "pages"

SOURCE_BRANCH = "master"
DESTINATION_BRANCH = "master"

def check_destination
  unless Dir.exist? "_site"
    sh "git clone https://#{ENV['GIT_NAME']}:#{ENV['GH_TOKEN']}@github.com/#{USERNAME}/#{REPO}.git _site"
  end
end

task :deploy do
    # Detect pull request
    if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
      puts 'Pull request detected. Not proceeding with deploy.'
      exit
    end

    # Configure git if this is run in Travis CI
    if ENV["TRAVIS"]
      sh "git config --global user.name '#{ENV['GIT_NAME']}'"
      sh "git config --global user.email '#{ENV['GIT_EMAIL']}'"
      sh "git config --global push.default simple"
    end

    # Make sure destination folder exists as git repo
    check_destination
    
    puts "_site"

    Dir.chdir("_site") { sh "git rm -rf ." }

    sh "bundle exec jekyll build"

    sh "ipfs swarm peers"
    ipfs_hash = `ipfs add -r -Q _site`.match(/\w+/)[0]
    sh "ipfs name publish --key=key #{ipfs_hash}"

    # Commit and push to github
    sha = `git log`.match(/[a-z0-9]{40}/)[0]
    Dir.chdir("_site") do
      sh "git add --all ."
      sh "git commit -m 'Updating to ##{sha}. ipfs://#{ipfs_hash}'"
      sh "git push --quiet origin #{DESTINATION_BRANCH}"
      puts "Pushed updated branch #{DESTINATION_BRANCH} to GitHub Pages"
    end

    while true do
      peers = `ipfs swarm peers | wc -l`.match(/\d+/)[0].to_i
      if peers >= 100 then
        puts "\nConnected to #{peers} peers"
        sh `ipfs swarm peers`
        break
      else
        sleep(1)
      end
    end

end