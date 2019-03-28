#!/bin/bahs

basejs_list=("js/language.js"  "js/core/base.js"  "js/core/timer.js"  "js/core/player.js"  "js/core/audio.js"  "js/view/cd.js"  "js/view/movieclip.js"  "js/view/helper.js"  "js/view/guide.js"  "js/view/loginworld.js"  "js/view/roleworld.js"  "js/view/cityworld.js"  "js/view/mapworld.js"  "js/view/chatpop.js"  "js/view/miscpop.js"  "js/view/mailpop.js"  "js/view/mailboxpop.js"  "js/view/trendspop.js"  "js/view/battleworld.js"  "js/data/mapini.js"  "js/data/ini.js"  "js/obj/battle_hero.js"  "js/obj/battle_num.js"  "js/obj/battle_team.js"  "js/core/jsMorph-0.5.0.min.js"  "js/core/socket.io.min.js"  "js/core/PxLoader.js"  "js/core/PxLoaderImage.js"  "js/core/gamestart.js")
for i in ${basejs_list[@]}
do
   wget http://img2.hanjiangsanguo.com/h5cdn/20151225160/static/$i
done
