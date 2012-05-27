# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
  config.vm.network :hostonly, "33.33.33.100"

  config.vm.share_folder("v-data", "/vagrant", ".", :nfs => true)

  config.vm.provision :puppet, :options => ["--environment", "local", ] do |puppet|
    puppet.module_path    = ["puppet/modules"]
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file  = "init.pp"
  end

  config.vm.customize ["modifyvm", :id, "--memory", "512"]
end
