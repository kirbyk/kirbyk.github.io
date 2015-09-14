---
layout: post
title:  "Domain registrars, DNS, and hosting"
date:   2015-09-11 18:53:06
categories: domain DNS hosting
cover: /img/telephones.jpg
---
It took me a while to set up the infrastructure that runs my website and email in
a way that made me happy. There are a lot of crappy domain registrars, DNS
providers, and web hosts out there. I'm finally in a place where I'm pleased
with each component in my pipeline, so I thought I'd share my setup with the
world.

### Namecheap

Back in the day I, like many other people, used GoDaddy as my primary domain
registrar. Quickly I learned that GoDaddy spends all of their money on
[fancy advertising][godaddy] instead of hiring UX engineers or product managers.
Their support team was subpar as well during my time there.

Nowadays I only use [Namecheap][namecheap] for my domain needs. Namecheap is by
far the best interface I've found for managing domains, and it gets better
everytime I use it. They also always have great deals on [new TLDs][tlds], and
searching for a great domain on their site is always a fantastic experience.

### CloudFlare

Every domain registrar will provide you with the ability to configure your DNS
settings for your domain, but no free nameserver service can really compare to
[CloudFlare][cloudflare]. I don't want to take too much time explaining all of
the amazing things that CloudFlare can do for you, because [this video][CFvideo]
already does an incredible job.

If you watched that video, then you know about a lot of the awesome features
that CloudFlare provides to its users for free. My absolutely favorite feature
though is surprisingly unemphazied on CloudFlare's site. The number one reason
I use CloudFlare is because [I never have to wait on DNS propagation][propagation].

### GitHub Pages

Hosting a website can also be quite a pain. If you just need to host a static
website, then there is [no reason][google] you need to pay for hosting. My
personal favorite solution is [GitHub Pages][github]. I already use `git` to
manage my website, so GitHub Pages makes updating my website as easy as `git push`.
No more FTP, SSH, or any other three letter acroynms.

### Setting it up

By now you should have a good high-level overview of how to setup your website,
but there can be small implementation details that still make connecting the
dots difficult. Here are all the steps you need to follow in order to utilize
the above services:

#### 1. Get your domain on Namecheap.

It doesn't matter if you buy it directly or transfer it, but get your domain on
Namecheap.

#### 2. Add your site to CloudFlare.

On CloudFlare add your site, scan the current DNS records, and select the free
plan. Once you've done that you'll be prompted with two nameserver addresses.
Save these for the next step.

#### 3. Point Namecheap to CloudFlare.

Go back to Namecheap, click 'Manage Domains' from the dropdown on the top-left,
select your domain, and then click 'Transfer DNS to Webhost'. From here enter
the two nameservers you got from CloudFlare and click save.

#### 4. Check the nameservers.

Awesome, now go back to your site on CloudFlare and click 'Recheck Nameservers',
this can take up to 24 hours, but often (especially with Namecheap) it only
takes a few minutes.

#### 5. Setup GitHub Pages.

Head over to GitHub and create a [new repo][repo] called *username*.github.io,
where username is your username on GitHub. From here you can push your static
website up with the following commands:

{% highlight bash %}  
# from your website directory on your local machine
$ git init
$ git add .
$ git commit -m 'Initial commit'
$ git remote add origin <your-remote-url> # replace '<your-remote-url>' with the one you get from your repo page on GitHub
$ git push -u origin master
{% endhighlight %}

If you don't want to spend time messing with `git`, then you can click 'Settings'
on the right-hand side of your repo, and then click 'Launch automatic page
generator' to setup a beautiful one page website.

#### 6. Point your DNS to GitHub Pages.

You can now got back to your site on CloudFlare and click 'DNS' at the top. From
here you're going to want to add a CNAME record. The first value (name) will be
'@', and the second value (domain name) will be *username*.github.io, where
username is your username on GitHub.

Unless you have some subdomains or other special circumstances you can delete
any other CNAME or A records off of CloudFlare. Just to be safe though, I'd
suggest you backup your DNS records by clicking, 'Advanced' and 'Export.'

I personally don't like the 'www' that prefixes a lot of domains. I get rid of
this by adding another CNAME record with first value 'www' and second value 
*username*.github.io, where username is your username on GitHub.

#### 7. Add a CNAME file on GitHub.

The last step in this process is to tell GitHub Pages about our domain. We do
this by adding a file called 'CNAME' to the root directory of our website's
repository on GitHub. To do this run the following commands:

{% highlight bash %}  
# from your website directory on your local machine
$ echo '<your-domain>' >> CNAME # where '<your-domain>' is your domain
$ git add CNAME
$ git commit -m 'Add CNAME'
$ git push origin master
{% endhighlight %}


[godaddy]:      http://fortune.com/2015/03/30/godaddy-ads-ipo/
[namecheap]:    http://www.namecheap.com/?aff=90584
[tlds]:         https://www.namecheap.com/domains/new-tlds/explore.aspx?aff=90584
[cloudflare]:   https://www.cloudflare.com/
[CFvideo]:      https://vimeo.com/14700285
[propagation]:  https://blog.cloudflare.com/never-deal-with-dns-propagation-again/
[google]:       https://google.com/search?q=free+static+website+hosting
[github]:       https://pages.github.com/
[repo]:         https://github.com/new
