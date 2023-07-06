---
layout: post
title: "Avoiding Blackouts with OpenWRT"
date: 2023-07-05 19:50:00 -07:00
categories: 'tech'
---

I recently encountered a blackout issue with a popular baseball streaming subscription: I could not watch my city's team on it, supposedly because I'm supposed to do so on their affiliated regional sports network. The issue with that policy, however, is that their regional sports network was only available on one IPTV provider, and it wasn't the one I have (YouTube TV). And it certainly wasn't a good enough reason for me to make the switch.

Instead, I tried enabling a VPN connection on my computer and fudging its location to another city. Surprisingly, that's all it took to unblock my local games. This revealed another issue: I typically watch sports on my TV, not my desktop. My TV accesses them through an app on its built-in OS, and there's no way to install a VPN on it. So, I looked at moving my VPN to my router instead.

I couldn't do this on my main router, since it's provided by my ISP and it's pretty locked down in terms of functionality. I also couldn't expand it's functionality with an open source router firmware, since none of the projects I checked supported my ISP-specific hardware. So instead, I went on Amazon to find the cheapest router I could on OpenWRT's supported software list, and ended up spending a mere $20 on the [Netgear R6020](https://www.amazon.com/gp/product/B01NBBA1HS/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1).

Is this a great router? No! But it certainly was good enough to connect my TV to in order to stream sports at 720p. Once it arrived, I plugging was eager to install the OpenWRT firmware image on it, so I plugged it into the wall, connected to it, flashed the firmware, then enabled wifi and connected its WAN port to one of my main router's ethernet LAN ports.

When I went to install OpenVPN's package, however, I quickly realized how limited space is on such a low level device like this&mdash;I could install OpenWRT, but didn't have enough room for the OpenVPN package. In fact, I had so little room that when I tried installing it, I managed to run out of room for the OS to be able to delete the partially installed package, so I ended up resetting the firmware and returning to square one.

Thankfully, this is a common enough issue that OpenWRT allows you to customize your firmware images with whatever set of packages you require pre-installed. I loaded up WSL and pulled down the tool, following the [instructions here](https://openwrt.org/docs/guide-developer/toolchain/wsl) to get the environment set up. I was then able to build a custom image with OpenVPN using the following command (Note that you have to include LuCI in the set up packages to install in addition to the base packages; they don't include that interface by default):

```
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin make image PROFILE="netgear_r6020" PACKAGES="openvpn-openssl luci-app-openvpn luci luci-ssl"
```

Then, I simply used the sysupgrade firmware flashing UI to install this custom image. After that, I had OpenVPN running: success!

All that was left was to configure the VPN. I use Private Internet Access (not an ad), and they provide their .ovpn config files [here](https://helpdesk.privateinternetaccess.com/kb/articles/where-can-i-find-your-ovpn-files). I uploaded a few of them using the LuCI GUI, used the built in authentication config text box to add my username and password, and fired up one of the server connections.

That killed my internet connection&mdash;whoops.

Turns out you also need to configure an interface for OpenVPN, and then add it to your WAN firewall zone. You can do that by going to Network > Interfaces > Add new interface, and then setting the Device to `tun0`. After that, go to the "Firewall settings" tab, and set the "Create / assign firewall zone" dropdown to `wan`. Once that was done, the VPN connection worked, and I was able to kick back, relax, and watch the boys of summer.
