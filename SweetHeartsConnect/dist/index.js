// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  loveMessages = /* @__PURE__ */ new Map();
  reminders = /* @__PURE__ */ new Map();
  loveTasks = /* @__PURE__ */ new Map();
  virtualHugs = /* @__PURE__ */ new Map();
  complaints = /* @__PURE__ */ new Map();
  constructor() {
    this.initializeData();
  }
  async initializeData() {
    const dayOfYear = Math.floor((Date.now() - new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 0).getTime()) / (1e3 * 60 * 60 * 24));
    const loveMessages2 = [
      "You're the sunshine that brightens even my darkest days. \u2600\uFE0F",
      "Every heartbeat of mine beats only for you. \u{1F493}",
      "No matter how far we are, you're always close to my heart. \u{1F30D}\u{1F496}",
      "Just thinking about you makes my day instantly better. \u{1F970}",
      "You're not my number one. You're my only one. \u{1F498}",
      "You are the sunshine that brightens my every morning and the moonlight that soothes my every night. \u{1F305}\u{1F319}",
      "Every heartbeat whispers your name, every breath I take is filled with love for you. \u{1F493}",
      "In a world full of temporary things, you are my forever. \u{1F4AB}",
      "Your smile is my favorite notification, your laugh is my favorite sound. \u{1F60A}\u{1F514}",
      "You make my heart feel like it's dancing even when my feet are still. \u{1F483}\u2764\uFE0F",
      "Being with you feels like coming home to a place I never knew I was searching for. \u{1F3E1}\u{1F495}",
      "You're not just my girlfriend, you're my best friend, my safe place, my everything. \u{1F917}",
      "Every day with you is a new adventure, every moment a new reason to fall deeper in love. \u{1F5FA}\uFE0F\u{1F496}",
      "Your love has turned my life into the most beautiful story ever written. \u{1F4D6}\u2728",
      "When I count my blessings, I count you twice - once for being you, and once for being mine. \u{1F64F}\u{1F49D}",
      "You are my favorite chapter in this beautiful book called life. \u{1F4DA}\u{1F495}",
      "Your eyes hold galaxies, your touch creates magic, your love transforms everything. \u2728\u{1F30C}",
      "With you, I've learned that home isn't a place, it's a feeling, and you are mine. \u{1F3E0}\u{1F496}",
      "You are my today, my tomorrow, my always, and my forever. \u{1F4AB}\u23F0",
      "Your love is the melody that makes my heart sing the most beautiful song. \u{1F3B5}\u{1F497}",
      "I never believed in fate until every road led me to you. \u{1F6E3}\uFE0F\u2764\uFE0F",
      "Your smile rewrites the definition of joy in my heart. \u{1F60A}\u{1F4DD}",
      "Even the stars envy the way I look at you. \u2728\u{1F440}",
      "You\u2019re my constant in a world full of variables. \u{1F501}\u{1F522}",
      "Just one hug from you makes my whole week better. \u{1F917}\u{1F497}",
      "I\u2019d cross galaxies just to see your face light up. \u{1F30C}\u{1F31F}",
      "You are the only person I want to tell everything to\u2014no filter. \u{1F399}\uFE0F\u{1F4AC}",
      "You\u2019re the song that makes my heart beat in harmony. \u{1F3B6}\u2764\uFE0F",
      "Even time slows down when we\u2019re together. \u{1F570}\uFE0F\u{1F49E}",
      "I\u2019d rather argue with you than laugh with anyone else. \u{1F525}\u{1F604}",
      "You're the person my soul recognized long before we met. \u{1F9EC}\u{1F495}",
      "When you\u2019re near, my world feels in perfect balance. \u2696\uFE0F\u{1F496}",
      "I never believed in miracles until I met you. \u2728\u{1F64F}",
      "Your love is my daily dose of magic. \u{1F48C}\u{1F52E}",
      "You\u2019re the warmth in my coldest days. \u2744\uFE0F\u{1F525}",
      "I\u2019d write your name on the moon if it meant you\u2019d smile. \u{1F315}\u{1F58A}\uFE0F",
      "You're the heartbeat I never want to skip. \u{1F493}\u{1F501}",
      "I fell for your mind just as hard as I fell for your eyes. \u{1F9E0}\u{1F441}\uFE0F",
      "Every memory with you is a treasure I\u2019ll never trade. \u{1F48E}\u{1F570}\uFE0F",
      "I never knew my favorite color until I saw you in the light. \u{1F3A8}\u{1F31F}",
      "You\u2019re the peace I never knew how to ask for. \u270C\uFE0F\u{1F497}",
      "When I\u2019m lost, your voice is my north star. \u{1F9ED}\u{1F3A4}",
      "I want to write books about the way you laugh. \u{1F4DA}\u{1F604}",
      "You\u2019re not just my person\u2014you\u2019re my purpose. \u{1FAF6}\u{1F3AF}",
      "Loving you is the art my soul paints every day. \u{1F3A8}\u2764\uFE0F",
      "You\u2019re the best decision my heart ever made. \u2705\u{1F498}",
      "You are the echo of my favorite dreams. \u{1F319}\u{1F50A}",
      "Even your silence speaks straight to my heart. \u{1F92B}\u{1F493}",
      "You are the cozy corner of my life. \u2615\u{1F6CB}\uFE0F",
      "Every love song finally makes sense because of you. \u{1F3BC}\u{1F497}",
      "You made me believe that happy endings aren\u2019t just in books. \u{1F4D6}\u{1F3F0}",
      "You\u2019re the only addiction I never want to break. \u{1F489}\u{1F49E}",
      "Your name is written in every wish I make. \u{1F320}\u{1F4DD}",
      "You\u2019re not just loved\u2014you\u2019re worshiped by every part of me. \u{1F647}\u2764\uFE0F",
      "You turned my ordinary life into something extraordinary. \u{1F308}\u{1F31F}",
      "You\u2019re the color I didn\u2019t know my world was missing. \u{1F308}\u{1F58C}\uFE0F",
      "No GPS needed\u2014my heart already knows the way to you. \u{1F4CD}\u{1F496}",
      "I\u2019d rather have a moment with you than a lifetime without. \u{1F570}\uFE0F\u2764\uFE0F",
      "You're my secret favorite everything. \u{1F92B}\u{1F498}",
      "You hold the key to every closed part of me. \u{1F5DD}\uFE0F\u{1F493}",
      "Your love doesn\u2019t just touch me\u2014it transforms me. \u{1F504}\u2764\uFE0F",
      "You make my worst days feel like they had a reason\u2014to lead me to you. \u{1F327}\uFE0F\u27A1\uFE0F\u2600\uFE0F",
      "Loving you is my most natural instinct. \u{1F43E}\u{1F493}",
      "You taught me that real love is felt, not explained. \u{1F9E0}\u{1F6AB}\u{1F498}",
      "You're the reason my walls are now windows. \u{1F9F1}\u27A1\uFE0F\u{1FA9F}",
      "I\u2019d choose your chaos over anyone else\u2019s calm. \u{1F32A}\uFE0F\u{1F497}",
      "You make me feel like the only person on the planet. \u{1F30D}\u{1FAF6}",
      "You are my unexpected favorite. \u{1F381}\u{1F498}",
      "I\u2019d relive every pain if it meant getting to love you again. \u{1F494}\u{1F501}\u2764\uFE0F",
      "You\u2019re not just special\u2014you\u2019re sacred. \u2728\u{1F64F}",
      "You\u2019re the \u201Cforever\u201D that I used to roll my eyes at. \u267E\uFE0F\u{1F440}",
      "You're my calm, my storm, my in-between. \u{1F324}\uFE0F\u{1F493}",
      "You make being vulnerable feel safe. \u{1F6E1}\uFE0F\u{1F496}",
      "I\u2019d get lost with you, just to never be found. \u{1F9ED}\u{1F332}",
      "I want to memorize every curve of your voice. \u{1F5E3}\uFE0F\u{1F3B5}",
      "Your love is the kind that rewires hearts. \u{1F498}\u{1F527}",
      "You make me want to be softer, slower, sweeter. \u{1F36F}\u{1F497}",
      "You\u2019re the fairytale I never thought I\u2019d live. \u{1F3F0}\u{1F4DA}",
      "You are the place where all my fears rest. \u{1F60C}\u{1F6CC}",
      "I want to build a life where every wall has your laughter in it. \u{1F9F1}\u{1F604}",
      "The world feels right when your hand is in mine. \u{1F590}\uFE0F\u{1F91D}",
      "I\u2019d rather be wrong with you than right alone. \u274C\u2764\uFE0F",
      "You're the exhale after a long day. \u{1F32C}\uFE0F\u{1F60C}",
      "You\u2019re the one I want to tell my boring stories to. \u{1F4D6}\u{1F602}",
      "Even my dreams feel empty without you in them. \u{1F319}\u{1F4AD}",
      "I love the way you make time feel slower, softer, sweeter. \u{1F570}\uFE0F\u{1F49E}",
      "Every path I take, I hope leads to you. \u{1F6E4}\uFE0F\u{1F493}",
      "You\u2019re the candle that lit up all the dark corners in me. \u{1F56F}\uFE0F\u2764\uFE0F",
      "You're my favorite hello and the hardest goodbye. \u{1F44B}\u{1F498}",
      "I didn\u2019t find you\u2014you found me, and changed everything. \u{1F50D}\u{1F496}",
      "You\u2019re the sky I want to watch every sunset with. \u{1F305}\u{1F491}",
      "You're not my other half\u2014you\u2019re the full heart I never had. \u{1F4AF}\u2764\uFE0F",
      "If my heart could write, it would only write your name. \u{1F4DD}\u{1F493}",
      "I could spend my entire life tracing the lines of your hands and still find something new to love in every curve. \u270B\u2764\uFE0F",
      "The way your eyes look at me feels like a lifetime of love in a single glance. \u{1F441}\uFE0F\u{1F498}",
      "I\u2019ve had good days and bad ones, but nothing compares to the days I spend just being near you. \u{1F5D3}\uFE0F\u{1F495}",
      "You didn\u2019t just enter my heart\u2014you built a home there. \u{1F3E1}\u{1F493}",
      "Every time you speak, my soul leans in like it\u2019s hearing its favorite song. \u{1F3B6}\u{1FAC0}",
      "I\u2019d relive every heartbreak just to meet you again. \u{1F501}\u{1F494}\u2764\uFE0F",
      "When you laugh, the world stops for a moment\u2014and I never want it to start again. \u{1F602}\u23F3",
      "I don\u2019t dream about perfect people\u2014I dream about imperfect people who feel like home. Like you. \u{1F4A4}\u{1F496}",
      "You\u2019re the story I\u2019d write a thousand times and never get tired of telling. \u{1F4D6}\u270D\uFE0F",
      "Even forever feels too short when it comes to loving you. \u267E\uFE0F\u2764\uFE0F",
      "I didn\u2019t fall in love\u2014I walked in, eyes open, knowing there was no way out I\u2019d ever take. \u{1F6AA}\u{1F498}",
      "You turn rainy days into moments I want to hold onto forever. \u{1F327}\uFE0F\u{1FAF6}",
      "Some people come into your life as blessings. You came in as everything. \u{1F64F}\u{1F4AB}",
      "I\u2019d pause the world just to spend one more minute staring at your smile. \u23F8\uFE0F\u{1F60A}",
      "You\u2019re not just a part of my life\u2014you\u2019re the reason it feels whole. \u{1F9E9}\u{1F497}",
      "Your love doesn\u2019t just hold me\u2014it heals me. \u{1FA79}\u{1F49E}",
      "I never needed fireworks when I had the spark in your eyes. \u{1F386}\u{1F440}",
      "You make the silence between words feel more romantic than any poem. \u{1F92B}\u{1F4DD}",
      "You\u2019re the wish I didn\u2019t know I was making, answered before I even asked. \u{1F320}\u2764\uFE0F",
      "I could fill oceans with everything I feel when you look at me. \u{1F30A}\u{1F493}",
      "You are not a coincidence\u2014you are the most beautiful inevitability. \u{1F3AF}\u{1F498}",
      "You make even my ugliest days feel like they were worth it, just to end with your voice. \u{1F5D3}\uFE0F\u{1F3A4}",
      "When you speak my name, it feels like a sacred prayer. \u{1F64F}\u{1FA77}",
      "I didn\u2019t choose you just once. I choose you every day, every hour, every heartbeat. \u{1F570}\uFE0F\u{1F497}",
      "I don\u2019t care where we go, as long as your hand is in mine. \u{1F91D}\u{1F30D}",
      "There are galaxies in your smile and peace in your presence. \u{1F30C}\u{1F60A}",
      "You\u2019re the morning I want to wake up to for the rest of my life. \u2600\uFE0F\u{1F493}",
      "You don't just light up a room\u2014you make the walls lean in to listen. \u{1F56F}\uFE0F\u{1F3E0}",
      "I want to learn every language just to tell you \u201CI love you\u201D in a thousand ways. \u{1F5E3}\uFE0F\u2764\uFE0F",
      "Your love is the poetry my heart never knew it was writing. \u{1F4DD}\u{1F498}",
      "Sometimes I just stare at you and smile\u2014not because of what you\u2019re doing, but because of who you are. \u{1F60A}\u{1F440}",
      "I don't want the perfect life\u2014I want the imperfect one we build together. \u{1F6E0}\uFE0F\u{1F491}",
      "You\u2019re the gravity that keeps my heart from floating away. \u{1F30D}\u{1F9F2}",
      "I never believed in signs until the universe gave me you. \u{1FA90}\u{1F4E9}",
      "You don\u2019t complete me\u2014you elevate me. \u2B06\uFE0F\u{1F497}",
      "I\u2019d write you a hundred love letters if I thought it would make you smile once more. \u{1F48C}\u{1F4EC}",
      "There are a million versions of love, but yours is the only one that makes sense to me. \u{1F9E0}\u2764\uFE0F",
      "You make even 2 a.m. feel like a sunrise. \u{1F305}\u{1F551}",
      "I don\u2019t just want to grow old with you\u2014I want to grow kinder, braver, and more loving with you. \u{1F475}\u{1F498}\u{1F474}",
      "Your name is the only word my heart spells correctly every time. \u{1FAC0}\u{1F524}",
      "Some people write songs about love. I just think about you. \u{1F3BC}\u{1FA77}",
      "You turn mundane moments into memories I\u2019ll carry forever. \u{1F6D2}\u2764\uFE0F",
      "Every little detail about you feels like it was made just for me. \u{1F9E9}\u{1F496}",
      "My favorite part of the day is knowing I get to love you through it. \u{1F570}\uFE0F\u{1F491}",
      "Your arms are my safe place, no matter how far the world pulls us. \u{1F917}\u{1F30D}",
      "You are both the calm and the chaos\u2014and I love you for both. \u26A1\u{1F54A}\uFE0F",
      "If my love had a sound, it would be your name whispered into forever. \u{1F3A4}\u267E\uFE0F",
      "You\u2019re not just loved\u2014you\u2019re honored. \u{1F451}\u2764\uFE0F",
      "You don\u2019t even have to try\u2014you\u2019re already everything. \u{1F31F}",
      "When I met you, my definition of happiness rewrote itself. \u{1F4DD}\u{1F60A}",
      "You turn my nervousness into butterflies, and my butterflies into belief. \u{1F98B}\u{1F64F}",
      "You are my heart\u2019s favorite reason to beat. \u2764\uFE0F\u{1F3B5}",
      "You\u2019re the person I look for in every crowd\u2014even when I know you\u2019re not there. \u{1F440}\u{1F498}",
      "Every second we spend apart feels like time is punishing me for loving you this much. \u231B\u{1F494}",
      "I want to love you like the moon loves the tide\u2014endlessly, silently, and with devotion. \u{1F315}\u{1F30A}",
      "I\u2019d rather have one lifetime with you than eternity with someone else. \u{1F570}\uFE0F\u267E\uFE0F",
      "You are the punctuation in every sentence of my heart. \u{1F4DD}\u2764\uFE0F",
      "I didn\u2019t fall in love with your beauty. I fell in love with how beautiful you made me feel. \u{1F490}\u{1F49E}",
      "Your voice could bring peace to wars my heart didn\u2019t know it was fighting. \u{1F3A4}\u{1F6E1}\uFE0F",
      "You make the passing of time feel like a blessing, not a countdown. \u23F3\u{1FAF6}",
      "Every breath I take is a silent thank you to the universe for giving me you. \u{1F30C}\u{1F4A8}",
      "You are the treasure I didn\u2019t know I was hunting for. \u{1FA99}\u{1F3F4}\u200D\u2620\uFE0F",
      "You don\u2019t just live in my heart\u2014you\u2019ve redecorated it. \u{1F6CB}\uFE0F\u2764\uFE0F",
      "Your soul speaks a language my heart always understood. \u{1FAC0}\u{1F5E3}\uFE0F",
      "I used to believe love was complicated. Then I met you\u2014and it became simple. \u{1F90D}",
      "You bring color to days I didn\u2019t even realize were grey. \u{1F308}\u{1F32B}\uFE0F",
      "You are my best friend, my safe space, my once-in-a-lifetime. \u{1F46B}\u{1F496}",
      "There\u2019s no version of the future that feels right without you in it. \u{1F6E3}\uFE0F\u{1F491}",
      "I didn\u2019t just find love in you\u2014I found the courage to believe in it again. \u{1F4AA}\u{1F498}",
      "You make all my broken pieces feel like part of a beautiful mosaic. \u{1F9E9}\u{1F3A8}",
      "You\u2019re the chapter my heart had been waiting for. \u{1F4D6}\u2764\uFE0F",
      "The stars look different now\u2014because one of them walked into my life. \u2728\u{1F6B6}\u200D\u2640\uFE0F",
      "I love you more than yesterday, less than tomorrow, and not even close to forever. \u{1F570}\uFE0F\u2764\uFE0F\u267E\uFE0F",
      "I could search the universe and never find another heart that fits mine like yours. \u{1F4AB}",
      "Your laughter is the melody my soul plays on repeat. \u{1F3B6}",
      "You walked into my life and turned every ordinary moment into magic. \u2728",
      "I didn\u2019t know what home felt like until you held me. \u{1F3E1}",
      "The way your eyes light up when you smile\u2014pure poetry. \u{1F4D6}",
      "You\u2019re not just in my thoughts\u2014you\u2019ve built a castle there. \u{1F3F0}",
      "Even silence feels romantic when I\u2019m with you. \u{1F90D}",
      "Your presence is the peace I never knew I needed. \u{1F54A}\uFE0F",
      "My favorite part of the day is the moment I see your name pop up. \u{1F4F1}\u{1F493}",
      "Loving you is like breathing\u2014effortless and constant. \u{1F32C}\uFE0F",
      "Your hugs feel like my heart finally found its rhythm. \u{1F917}",
      "In your eyes, I see the love story I never dreamed I\u2019d get. \u{1F49E}",
      "I don\u2019t believe in perfect people, but I do believe in perfect for me. That's you. \u{1F498}",
      "My favorite moments are the ones where we\u2019re doing nothing, but it means everything. \u{1F4AD}",
      "You make even the moon jealous of how much I adore you. \u{1F319}\u{1F497}",
      "Every day with you feels like a handwritten love letter from the universe. \u{1F48C}",
      "I love you more than words\u2014and I know all the best ones. \u{1F4DA}",
      "You turned my \u201Csome day\u201D into \u201Cright now.\u201D \u23F3\u{1F496}",
      "You didn\u2019t just steal my heart\u2014you built a garden in it. \u{1F337}",
      "You\u2019re not a chapter in my life\u2014you\u2019re the whole book. \u{1F4D8}",
      "I fall in love with your soul a little more every single day. \u2728",
      "When I say \u201CI love you,\u201D I\u2019m also saying \u201Cthank you.\u201D \u{1F64F}\u2764\uFE0F",
      "With every heartbeat, my love for you deepens. \u{1F502}",
      "I\u2019d choose you in every lifetime, without hesitation. \u267E\uFE0F",
      "You make love feel like the safest place in the world. \u{1F6E1}\uFE0F\u{1F493}",
      "Your voice is my favorite sound, even when you\u2019re just reading the menu. \u{1F970}",
      "I want to grow old with you, laughing over memories we haven't made yet. \u{1F9D3}\u{1F475}",
      "You turn my insecurities into things I learn to love. \u{1FA9E}",
      "You see the best in me\u2014even when I can\u2019t. \u{1F4AB}",
      "Every second with you is worth a thousand without. \u23F1\uFE0F\u{1F497}",
      "You bring out a version of me I always dreamed I could be. \u{1F31F}",
      "I don\u2019t need paradise, I just need five minutes with you. \u{1F334}\u{1F498}",
      "Loving you feels like writing poetry in the stars. \u{1F30C}\u{1F58B}\uFE0F",
      "You taught me what forever feels like in a moment. \u23F3\u{1F491}",
      "You make ordinary days feel like fairy tales. \u{1F4D6}\u2728",
      "I\u2019d rather spend one lifetime with you than face all the ages of this world alone. \u231B",
      "You don\u2019t complete me\u2014you make me overflow. \u{1F4A7}\u2764\uFE0F",
      "You\u2019re the calm in my chaos and the light in my storm. \u26C8\uFE0F\u2600\uFE0F",
      "Just one smile from you is enough to change my whole day. \u{1F60A}",
      "If love is a language, you\u2019re the only one I want to be fluent in. \u{1F5E3}\uFE0F\u{1F49E}",
      "I never believed in soulmates until you looked at me like that. \u{1F440}\u{1F498}",
      "You\u2019re the sunrise I want to wake up to for the rest of my life. \u{1F305}",
      "If kisses were stars, I\u2019d send you the galaxy. \u{1F48B}\u{1F320}",
      "You don\u2019t even try, yet you heal every broken part of me. \u{1FA79}",
      "Being in love with you is my favorite form of happiness. \u{1F33B}",
      "I could spend forever staring into your eyes and still not find an end. \u{1F441}\uFE0F\u267E\uFE0F",
      "You are the story I want to tell the universe about. \u{1F30C}\u{1F4D6}",
      "You make me believe that forever isn\u2019t long enough. \u{1F512}",
      "You are the wish my heart made when I didn't even know I was wishing. \u{1F320}\u2764\uFE0F",
      "You love me in ways I never thought I deserved. \u{1F497}",
      "I crave your voice more than my favorite song. \u{1F3A7}\u{1F493}",
      "Your love is the safest place I\u2019ve ever known. \u{1F6CF}\uFE0F\u{1F49E}",
      "You\u2019re not just my person\u2014you\u2019re my peace. \u262E\uFE0F",
      "Everything feels better when you\u2019re near. Even the bad days. \u{1F327}\uFE0F\u2600\uFE0F",
      "I\u2019m never more alive than when I\u2019m with you. \u{1F493}",
      "Your hand in mine is the only map I need. \u{1F5FA}\uFE0F\u{1F91D}",
      "With you, forever doesn\u2019t feel long\u2014it feels just right. \u{1F570}\uFE0F\u{1F491}",
      "I don\u2019t need fireworks; your smile lights up my whole world. \u{1F387}",
      "You\u2019re the dream I get to live wide awake. \u{1F4AD}\u{1F496}",
      "Even your flaws are beautiful to me. \u{1F498}",
      "You\u2019re not perfect, but you\u2019re perfect for me. \u{1F4AF}",
      "Just thinking about you makes my heart race. \u{1F3C1}\u{1F493}",
      "I love you more than I love Sunday mornings and coffee\u2014and that\u2019s saying a lot. \u2615",
      "If I had one wish, it would be to relive our first kiss every day. \u{1F48B}",
      "My favorite adventure is loving you. \u{1F9ED}\u2764\uFE0F",
      "You inspire me to be kinder, softer, better\u2014just by existing. \u{1F337}",
      "You\u2019re not just part of my story\u2014you\u2019re the title. \u{1F4D8}",
      "You are the spark that lit a fire I never want to put out. \u{1F525}",
      "I didn\u2019t know I needed you\u2014until you showed up and changed everything. \u{1FA84}",
      "Your love is the kind that poets try to write and fail. \u{1F4DD}\u{1F494}",
      "I\u2019d rather hold your hand than hold the stars. \u{1F30C}\u{1F91D}",
      "You are the rhythm that keeps my heart dancing. \u{1F483}\u{1FAC0}",
      "No matter how many lifetimes I live, I\u2019ll always look for you. \u267E\uFE0F\u2764\uFE0F",
      "You didn\u2019t just steal my heart\u2014you gave it a place to grow. \u{1F331}\u{1F493}",
      "Every time you say my name, the world feels a little softer. \u{1F30D}\u{1F4AC}",
      "Loving you feels like waking up in the middle of a dream I never want to end. \u{1F4AD}\u2600\uFE0F",
      "You turned all my scars into stories I\u2019m proud to tell. \u{1FA79}\u{1F4D6}",
      "When you\u2019re near, even silence becomes my favorite song. \u{1F3B6}\u{1F90D}",
      "You don\u2019t just make me feel loved\u2014you make me feel celebrated. \u{1F389}\u{1F498}",
      "If love was a scent, yours would linger in every breath I take. \u{1F338}\u{1F4A8}",
      "You're not just part of my happiness\u2014you\u2019re the root of it. \u{1F333}\u2764\uFE0F",
      "I didn\u2019t know what I was missing until you filled the empty spaces in me. \u{1F9E9}\u{1F493}",
      "With every glance, you rewrite what love means to me. \u270D\uFE0F\u{1F440}",
      "You're the part of my daydreams I never want to wake from. \u{1F634}\u{1F497}",
      "I never imagined someone could feel like both home and adventure. \u{1F3E1}\u{1F9ED}",
      "You don\u2019t just understand me\u2014you *feel* me. Deeply. \u{1F49E}\u{1F30A}",
      "You are the line my heart recites in every heartbeat. \u{1F4DC}\u{1FAC0}",
      "Even in a room full of stars, you\u2019d still be the one shining. \u{1F30C}\u2728",
      "You're not a spark\u2014you\u2019re a wildfire in my soul. \u{1F525}\u2764\uFE0F",
      "With you, love isn\u2019t a feeling. It\u2019s a reality I live in. \u{1F3E0}\u{1F498}",
      "You don\u2019t just love me\u2014you make me want to love myself. \u{1FA9E}\u{1F496}",
      "Your love turns every flaw of mine into something worthy. \u{1F494}\u2728",
      "You\u2019re my calm in chaos, my whisper in the noise. \u{1F32A}\uFE0F\u{1F92B}",
      "You didn\u2019t just open my heart\u2014you gave it wings. \u{1FABD}\u{1F497}",
      "Even the darkest nights feel safer with your name in my heart. \u{1F319}\u2764\uFE0F",
      "You make time feel like a poem\u2014each second full of meaning. \u23F3\u{1F4D6}",
      "You're the warmth in my cold hands and the light in my quiet soul. \u{1F450}\u{1F31F}",
      "You are every wish I whispered into pillows and stars. \u{1F320}\u{1F6CF}\uFE0F",
      "You're not a habit\u2014I\u2019ll never tire of loving you. \u{1F501}\u{1F493}",
      "Even when we\u2019re apart, I still feel wrapped in your presence. \u{1F4E6}\u{1F49E}",
      "You make love feel less like a word and more like an atmosphere. \u{1F4AC}\u{1F324}\uFE0F",
      "I\u2019ve stopped looking at the stars. You outshine them all. \u2728\u{1F648}",
      "You're the laugh in my favorite memory and the hug I never forget. \u{1FAC2}\u{1F4AD}",
      "You're not just someone I love\u2014you\u2019re the someone I *choose*. Every time. \u{1F504}\u2764\uFE0F",
      "You don\u2019t just make me believe in love\u2014you make me believe in *us*. \u{1F91D}\u{1F498}",
      "You\u2019re not a part of my world\u2014you *are* my world. \u{1F30E}\u{1F496}",
      "You are the warmth I wrap myself in when life gets cold. \u{1F9E3}\u2764\uFE0F",
      "Your voice is my peace and your silence is still full of love. \u{1F5E3}\uFE0F\u{1F90D}",
      "When I see you, I see the future I want. And the now I adore. \u{1F52E}\u{1F491}",
      "You taught my heart how to dance again. \u{1F483}\u{1FAC0}",
      "Every \u201CI love you\u201D from you feels like the first. \u2728\u{1F501}",
      "You\u2019re the safest adventure I\u2019ve ever taken. \u{1F9ED}\u{1F3F0}",
      "Even your chaos feels like a symphony in my chest. \u{1F3BB}\u{1F493}",
      "You make my bad days worth surviving and my good days unforgettable. \u{1F327}\uFE0F\u2600\uFE0F",
      "You gave me a forever in moments I never expected. \u{1F570}\uFE0F\u{1F498}",
      "You are the quiet kind of love that speaks louder than anything else. \u{1F92B}\u2764\uFE0F",
      "My heart has never felt more at home than it does with you. \u{1F3E0}\u{1FAF6}",
      "You\u2019re not a dream\u2014I know, because I never want to wake up from you. \u{1F634}\u{1F4AD}",
      "Even the things I once feared feel gentler with your love around me. \u{1F6E1}\uFE0F\u{1F49E}",
      "Your love is the reason I now believe in magic again. \u2728\u{1F387}",
      "You don\u2019t make me feel like a better person\u2014you remind me I always was. \u{1F4A1}\u{1F498}",
      "You are the only part of forever I never question. \u23F3\u267E\uFE0F",
      "You\u2019re not my other half\u2014you\u2019re my every piece in full. \u{1F9E9}\u2764\uFE0F",
      "Even the silence between us is filled with meaning. \u{1F90D}\u{1F515}",
      "If I had to relive my life a thousand times, I\u2019d always find my way back to you. \u{1F501}\u{1F493}",
      "You don\u2019t complete my story\u2014you write it with me. \u{1F4D6}\u270D\uFE0F",
      "You\u2019re not the reason I smile\u2014you\u2019re the reason I *feel* it. \u{1F60A}\u{1FAC0}",
      "You\u2019re the place I find myself when the world doesn\u2019t make sense. \u{1F30E}\u{1F50D}",
      "You aren\u2019t a spark\u2014you\u2019re the whole constellation. \u{1F30C}\u{1F496}",
      "You\u2019re not a page in my book\u2014you\u2019re the ink itself. \u{1F58B}\uFE0F\u{1F4DA}",
      "Even a second with you feels like a moment stolen from heaven. \u23F1\uFE0F\u{1F324}\uFE0F",
      "You're not just beautiful\u2014you make beauty feel small. \u{1F498}\u{1F4AB}",
      "You hold my love like it\u2019s sacred. And I hold you like you\u2019re everything. \u{1F64F}\u2764\uFE0F",
      "You're the rhythm my heart had been waiting to hear. \u{1FAC0}\u{1F3B5}",
      "You don\u2019t just love me\u2014you see me. Really, truly see me. \u{1F441}\uFE0F\u{1FA77}",
      "Even the quietest night feels full when I know you\u2019re mine. \u{1F30C}\u{1F319}",
      "You are every reason, every hope, every heartbeat I\u2019ve ever had. \u2764\uFE0F\u{1FAF6}",
      "You didn't change me\u2014you reminded me who I really am. \u{1FA9E}\u{1F493}",
      "Even when I feel lost, loving you is the one thing that\u2019s always clear. \u{1F9ED}\u2764\uFE0F",
      "You make ordinary love stories feel like legends. \u{1F4DC}\u2728",
      "You\u2019re not the light at the end of the tunnel\u2014you\u2019re the one holding it for me. \u{1F56F}\uFE0F\u{1F463}",
      "You're my favorite feeling in the world\u2014and I never want to lose it. \u{1F30D}\u{1F498}",
      "You\u2019re the final line in every prayer I\u2019ve whispered. \u{1F64F}\u{1F496}",
      "Even time slows down to admire you when you smile. \u23F3\u{1F60A}",
      "You\u2019re the one thing I never want to unlearn. \u{1F9E0}\u2764\uFE0F",
      "You are the poem I\u2019ve always been trying to write. \u270D\uFE0F\u{1F498}",
      "You\u2019re the only forever that feels too short. \u267E\uFE0F\u{1FAC0}",
      "No matter how long I live, no moment will ever beat the first time you said my name. \u{1F50A}\u{1F493}",
      "You\u2019re not just a person\u2014you\u2019re a feeling. The best one I know. \u{1F979}\u{1F49E}",
      "Your love is the reason I now believe in second chances. \u{1F504}\u{1F496}",
      "Even after all this time, you still leave me breathless. \u{1F62E}\u200D\u{1F4A8}\u2764\uFE0F",
      "You\u2019re not just my person\u2014you\u2019re the reason I am who I am today. \u{1F331}\u{1F493}",
      "No poem, song, or line will ever say \u201CI love you\u201D better than the way I look at you. \u{1F441}\uFE0F\u2764\uFE0F"
    ];
    const todaysMessageIndex = dayOfYear % loveMessages2.length;
    for (let i = 0; i < loveMessages2.length; i++) {
      await this.createLoveMessage({
        message: loveMessages2[i],
        isActive: i === todaysMessageIndex
      });
    }
    await this.initializeDailyReminders(dayOfYear);
    const allTasks = [
      "Say 'I love you' first thing",
      "Send a cute GIF \u{1F48C}",
      "Plan a sweet message",
      "Recall a shared memory \u{1F4F8}",
      "Draw a doodle for them \u270F\uFE0F",
      "Drink 8 glasses of water \u{1F4A7}",
      "Eat something delicious \u{1F37D}\uFE0F",
      "Take 3 deep breaths \u{1FAC1}",
      "Send me a cute selfie \u{1F4F8}",
      "Tell me about your day \u{1F4AC}",
      "Do something that makes you smile \u{1F60A}",
      "Give yourself a compliment \u{1F495}",
      "Listen to your favorite song \u{1F3B5}",
      "Stretch for 5 minutes \u{1F9D8}\u200D\u2640\uFE0F",
      "Write down one thing you're grateful for \u2728",
      "Take a 10-minute walk \u{1F6B6}\u200D\u2640\uFE0F",
      "Send a sweet message to someone you love \u{1F48C}",
      "Organize one small thing \u{1F9FA}",
      "Put your phone away for 30 mins \u{1F4F5}",
      "Look at the sky for 1 minute \u2601\uFE0F",
      "Smile at yourself in the mirror \u{1FA9E}",
      "Draw a doodle \u{1F3A8}",
      "Eat a fruit \u{1F34E}",
      "Hug your pillow tight \u{1F917}",
      "Play your favorite game \u{1F3AE}",
      "Look at old happy photos \u{1F5BC}\uFE0F",
      "Say 'I love myself' out loud \u{1F497}",
      "Play with your hair or style it \u{1F487}\u200D\u2640\uFE0F",
      "Make your bed nicely \u{1F6CF}\uFE0F",
      "Do 10 jumping jacks \u{1F938}\u200D\u2640\uFE0F",
      "Wash your face with love \u{1F9FC}",
      "Light a candle or smell something nice \u{1F56F}\uFE0F",
      "Read 1 page of a book \u{1F4D6}",
      "Write me a cute thought \u{1F4DD}",
      "Set one small goal for tomorrow \u{1F3AF}"
    ];
    const todayTaskIndexes = [0, 1, 2].map((i) => (dayOfYear + i) % allTasks.length);
    for (let i = 0; i < todayTaskIndexes.length; i++) {
      const taskIndex = todayTaskIndexes[i];
      await this.createLoveTask({
        title: allTasks[taskIndex],
        order: i + 1,
        isCompleted: false
      });
    }
  }
  async initializeDailyReminders(dayOfYear) {
    const allReminders = [
      "Drink water! \u{1F4A7}",
      "Send a sweet text \u{1F48C}",
      "Smile at your reflection \u{1F60A}",
      "Hug someone today \u{1FAC2}",
      "Stretch and breathe \u{1F32C}\uFE0F",
      "Write a gratitude note \u270D\uFE0F",
      "Remember to smile today - your smile is someone's sunshine! \u2600\uFE0F\u{1F60A}",
      "You are beautiful exactly as you are. Never forget your worth! \u{1F451}\u2728",
      "Take a moment to breathe deeply and appreciate this beautiful day. \u{1F338}\u{1FAC1}",
      "Your kindness makes the world a brighter place. Keep spreading love! \u{1F4AB}\u2764\uFE0F",
      "Don't forget to drink water and take care of your amazing self! \u{1F4A7}\u{1F33F}",
      "You are stronger than you know and braver than you feel. \u{1F4AA}\u{1F98B}",
      "Every challenge today is just making you more amazing. You've got this! \u{1F31F}\u{1F4AA}",
      "Remember to be gentle with yourself - you're doing better than you think. \u{1F917}\u{1F495}",
      "Your dreams are valid and your goals are achievable. Keep going! \u{1F3AF}\u2728",
      "You bring so much joy to those around you. Thank you for being you! \u{1F308}\u{1F496}",
      "Today is a perfect day to celebrate how wonderful you are. \u{1F389}\u{1F49D}",
      "Your heart is full of love, and the world is lucky to have you in it. \u{1F495}\u{1F30D}",
      "Remember that you are loved, cherished, and appreciated beyond measure. \u{1F970}\u{1F496}",
      "Take time to do something that makes your soul happy today. \u{1F338}\u{1F60C}",
      "You are a gift to this world, and I'm grateful for you every single day. \u{1F381}\u{1F495}",
      "Let today be a reminder that even your smallest steps are signs of courage. \u{1FAF6}",
      "You are not behind\u2014you are exactly where your journey is meant to unfold. \u{1F338}",
      "Drink water, stretch your body, and be kind to your mind today. \u{1F338}",
      "Celebrate the little joys\u2014your favorite song, warm sunlight, or even deep breaths. \u{1F33C}",
      "You don't have to do everything today. Just what matters most to your peace. \u{1F496}",
      "Speak to yourself with the same love you give so freely to others. \u{1F338}",
      "Some days are made for healing, not hustling. Rest is productive too. \u{1F33B}",
      "Your existence adds meaning to this world in ways you may never see. \u{1F33C}",
      "You have faced hard things and still found ways to bloom. That\u2019s strength. \u{1FAF6}",
      "It\u2019s okay to slow down. You are not a machine\u2014you are a miracle. \u{1F308}",
      "Let yourself feel joy today, without guilt or hesitation. \u{1F970}",
      "Breathe in peace, breathe out pressure. You are doing just fine. \u{1F60C}",
      "Progress doesn\u2019t always look loud. Sometimes it\u2019s soft and silent and still powerful. \u{1F33F}",
      "Your worth isn\u2019t tied to how much you accomplish\u2014it's in who you are. \u{1F338}",
      "Let today be the day you forgive yourself just a little more. \u{1F49E}",
      "Take a moment to smile at yourself in the mirror. That face is loved. \u2600\uFE0F",
      "You\u2019re allowed to have quiet days. You\u2019re still growing even in rest. \u{1F33C}",
      "Your dreams don\u2019t have an expiration date\u2014move at your pace. \u2728",
      "Drink some water and talk to yourself like someone you love deeply. \u{1F496}",
      "You\u2019ve come further than you think. Trust your steps. \u{1F4AB}",
      "Joy is not something you have to earn\u2014it\u2019s something you\u2019re allowed to feel. \u{1F31E}",
      "Gentleness is not weakness. It\u2019s how wildflowers survive storms. \u{1F33B}",
      "Just because it\u2019s hard doesn\u2019t mean you\u2019re doing it wrong. \u2764\uFE0F",
      "There is no shame in asking for help. It\u2019s brave and beautiful. \u{1FAF6}",
      "Today, be softer with yourself. You\u2019ve carried so much. \u{1F337}",
      "Breathe. Hydrate. Remind yourself: you're trying, and that matters. \u{1F4A7}",
      "Healing isn't linear, and that's perfectly okay. \u{1F33F}",
      "You are not a burden. You are someone learning how to bloom. \u{1F338}",
      "Celebrate that you got out of bed. That\u2019s a win. \u2728",
      "Give yourself space to be human. That includes the messy parts. \u{1F90D}",
      "One step forward, even if it's small, is still a victory. \u{1F98B}",
      "You are more than your mistakes\u2014you are growth in motion. \u{1F33C}",
      "A deep breath can shift your entire day. Take one now. \u{1F60C}",
      "You\u2019re allowed to not have it all figured out. None of us do. \u{1FAF6}",
      "The world is softer because you're in it. \u{1F30E}",
      "Your smile has healing power\u2014even for yourself. \u{1F60A}",
      "You're doing enough. In fact, you're doing great. \u{1F4AB}",
      "You don\u2019t need to prove your worth\u2014it already exists. \u{1F338}",
      "There is nothing wrong with needing rest. Honor that need. \u{1F6CF}\uFE0F",
      "Your kindness is seen, even when it feels unnoticed. \u{1F496}",
      "Trust that being yourself is more than enough. \u{1F33C}",
      "You don't need permission to rest. You are allowed to exhale. \u{1F62E}\u200D\u{1F4A8}",
      "Even on quiet days, your heart still speaks loudly in love. \u2764\uFE0F",
      "You\u2019re not behind\u2014you\u2019re on your own beautifully timed path. \u23F3",
      "Let your breath guide you back to the present moment. \u{1F9D8}\u200D\u2640\uFE0F",
      "Your peace matters more than perfection. \u{1F33F}",
      "Remember, self-care isn\u2019t selfish\u2014it\u2019s survival. \u{1F495}",
      "It's okay to be a work in progress. Art takes time. \u{1F3A8}",
      "Today, treat yourself like someone you would protect. \u{1F6E1}\uFE0F",
      "Your voice matters, even if it shakes. \u{1F3A4}",
      "You bring color into this world just by being you. \u{1F308}",
      "Happiness often hides in small things. Go looking. \u{1F41E}",
      "You don\u2019t need a reason to rest. Needing it is enough. \u{1F60C}",
      "You are worthy of love on your best and worst days. \u{1F49D}",
      "Tiny moments of peace can shift your whole day. \u{1F338}",
      "Not every day has to be productive to be meaningful. \u{1F324}\uFE0F",
      "You\u2019ve already survived so much. You\u2019re stronger than you know. \u{1F4AA}",
      "Your love for others is powerful\u2014don\u2019t forget to give some to yourself. \u2764\uFE0F",
      "Honor your feelings today without judging them. \u{1F33F}",
      "Even your quiet presence is a gift to those who love you. \u{1FAF6}",
      "The world needs your softness just as much as your strength. \u{1F33B}",
      "It\u2019s okay to unplug and choose silence for a while. \u{1F507}",
      "Let joy sneak in between the cracks of your busyness. \u2728",
      "Your healing doesn\u2019t have to make sense to anyone else. \u{1F4AB}",
      "You can take up space. In fact, you\u2019re meant to. \u{1F308}",
      "You\u2019re still enough, even when you don\u2019t feel like it. \u{1F496}",
      "You matter. Every single day. \u{1F9E1}",
      "Let yourself be loved\u2014even by your own heart. \u2764\uFE0F",
      "Rest is the bridge between effort and magic. \u{1F309}",
      "It's okay if today is quiet. Stillness is sacred too. \u{1F319}",
      "You\u2019re not broken\u2014you\u2019re becoming. \u{1F331}",
      "Gentle progress is still progress. \u2728",
      "Every sunrise is proof you get to try again. \u{1F305}",
      "You\u2019re allowed to celebrate yourself, loudly or quietly. \u{1F389}",
      "You are a story unfolding, and it\u2019s already beautiful. \u{1F4D6}",
      "Today is a chance to love yourself better than yesterday. \u{1F493}",
      "Breathe deep\u2014you\u2019re still here. That\u2019s no small thing. \u{1FAC1}",
      "Even your softest efforts are meaningful. \u{1F33C}",
      "The only approval you truly need is your own. \u2714\uFE0F",
      "Rest. Reflect. Recharge. Repeat if needed. \u{1F501}",
      "Joy is your birthright. Don\u2019t forget that. \u{1F31E}",
      "The best things grow slowly\u2014so are you. \u{1F33F}",
      "Peace begins with a single breath. Take one now. \u{1F62E}\u200D\u{1F4A8}",
      "There\u2019s beauty in your becoming. \u2728",
      "You were never meant to rush. Honor your pace. \u231B",
      "Compassion starts with how you speak to yourself. \u{1F49E}",
      "You don\u2019t have to shine every day to still be light. \u{1F4A1}",
      "There\u2019s nothing lazy about listening to your body. \u{1F6CF}\uFE0F",
      "You are both the seed and the bloom. Let that inspire you. \u{1F337}",
      "Every feeling deserves to be felt. Let them flow. \u{1F4A7}",
      "You are enough. Always have been, always will be. \u2764\uFE0F",
      "What you\u2019re doing today is shaping the strength of tomorrow. \u{1F4AA}",
      "Let the softness in you be louder than the noise outside. \u{1F3A7}",
      "You\u2019re not falling behind\u2014you\u2019re unfolding. \u{1F338}",
      "Water yourself with kindness today. \u{1F4A6}",
      "The way you love matters more than you think. \u{1F496}",
      "Your gentle heart is needed in this world. \u{1FAF6}",
      "Even on days of doubt, your light still reaches someone. \u{1F31F}",
      "Allow yourself to rest\u2014not to quit, but to continue. \u{1F504}",
      "Celebrate how far you\u2019ve come\u2014quietly or boldly. \u{1F973}",
      "You are made of resilience, wrapped in love. \u{1F9E1}",
      "Speak to your soul like it\u2019s sacred. Because it is. \u{1F4AB}",
      "Today, you get to start again\u2014with grace. \u{1F305}"
    ];
    const indexes = [0, 1, 2].map((i) => (dayOfYear + i) % allReminders.length);
    for (const i of indexes) {
      await this.createReminder({
        title: allReminders[i],
        isCompleted: false
      });
    }
  }
  async getLoveMessages() {
    return Array.from(this.loveMessages.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async getTodaysLoveMessage() {
    return Array.from(this.loveMessages.values()).find((msg) => msg.isActive);
  }
  async createLoveMessage(insertMessage) {
    const id = randomUUID();
    const message = {
      ...insertMessage,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      imageUrl: insertMessage.imageUrl ?? null,
      isActive: insertMessage.isActive ?? true
    };
    this.loveMessages.set(id, message);
    return message;
  }
  async getReminders() {
    return Array.from(this.reminders.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createReminder(insertReminder) {
    const id = randomUUID();
    const reminder = {
      ...insertReminder,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      description: insertReminder.description ?? null,
      isCompleted: insertReminder.isCompleted ?? false
    };
    this.reminders.set(id, reminder);
    return reminder;
  }
  async updateReminder(id, updates) {
    const reminder = this.reminders.get(id);
    if (!reminder) return void 0;
    const updatedReminder = { ...reminder, ...updates };
    this.reminders.set(id, updatedReminder);
    return updatedReminder;
  }
  async deleteReminder(id) {
    return this.reminders.delete(id);
  }
  async getLoveTasks() {
    return Array.from(this.loveTasks.values()).sort((a, b) => a.order - b.order);
  }
  async createLoveTask(insertTask) {
    const id = randomUUID();
    const task = {
      ...insertTask,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      description: insertTask.description ?? null,
      isCompleted: insertTask.isCompleted ?? false,
      order: insertTask.order ?? 0
    };
    this.loveTasks.set(id, task);
    return task;
  }
  async updateLoveTask(id, updates) {
    const task = this.loveTasks.get(id);
    if (!task) return void 0;
    const updatedTask = { ...task, ...updates };
    this.loveTasks.set(id, updatedTask);
    return updatedTask;
  }
  async deleteLoveTask(id) {
    return this.loveTasks.delete(id);
  }
  async getVirtualHugs() {
    return Array.from(this.virtualHugs.values()).sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
  }
  async sendVirtualHug(insertHug) {
    const id = randomUUID();
    const hug = {
      ...insertHug,
      id,
      sentAt: /* @__PURE__ */ new Date(),
      message: insertHug.message ?? null,
      hugType: insertHug.hugType ?? "warm"
    };
    this.virtualHugs.set(id, hug);
    return hug;
  }
  async getComplaints() {
    return Array.from(this.complaints.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createComplaint(insertComplaint) {
    const id = randomUUID();
    const complaint = {
      ...insertComplaint,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      status: insertComplaint.status ?? "open"
    };
    this.complaints.set(id, complaint);
    return complaint;
  }
  async updateComplaint(id, updates) {
    const complaint = this.complaints.get(id);
    if (!complaint) return void 0;
    const updatedComplaint = { ...complaint, ...updates };
    this.complaints.set(id, updatedComplaint);
    return updatedComplaint;
  }
  async deleteComplaint(id) {
    return this.complaints.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var loveMessages = pgTable("love_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull()
});
var reminders = pgTable("reminders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var loveTasks = pgTable("love_tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var virtualHugs = pgTable("virtual_hugs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message"),
  hugType: text("hug_type").default("warm").notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull()
});
var complaints = pgTable("complaints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").default("open").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertLoveMessageSchema = createInsertSchema(loveMessages).omit({
  id: true,
  createdAt: true
});
var insertReminderSchema = createInsertSchema(reminders).omit({
  id: true,
  createdAt: true
});
var insertLoveTaskSchema = createInsertSchema(loveTasks).omit({
  id: true,
  createdAt: true
});
var insertVirtualHugSchema = createInsertSchema(virtualHugs).omit({
  id: true,
  sentAt: true
});
var insertComplaintSchema = createInsertSchema(complaints).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/love-messages", async (req, res) => {
    try {
      const messages = await storage.getLoveMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch love messages" });
    }
  });
  app2.get("/api/love-messages/today", async (req, res) => {
    try {
      const message = await storage.getTodaysLoveMessage();
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch today's love message" });
    }
  });
  app2.get("/api/reminders", async (req, res) => {
    try {
      const reminders2 = await storage.getReminders();
      res.json(reminders2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reminders" });
    }
  });
  app2.post("/api/reminders", async (req, res) => {
    try {
      const validatedData = insertReminderSchema.parse(req.body);
      const reminder = await storage.createReminder(validatedData);
      res.status(201).json(reminder);
    } catch (error) {
      res.status(400).json({ message: "Invalid reminder data" });
    }
  });
  app2.patch("/api/reminders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const reminder = await storage.updateReminder(id, req.body);
      if (!reminder) {
        res.status(404).json({ message: "Reminder not found" });
        return;
      }
      res.json(reminder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update reminder" });
    }
  });
  app2.delete("/api/reminders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteReminder(id);
      if (!deleted) {
        res.status(404).json({ message: "Reminder not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete reminder" });
    }
  });
  app2.get("/api/love-tasks", async (req, res) => {
    try {
      const tasks = await storage.getLoveTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch love tasks" });
    }
  });
  app2.post("/api/love-tasks", async (req, res) => {
    try {
      const validatedData = insertLoveTaskSchema.parse(req.body);
      const task = await storage.createLoveTask(validatedData);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: "Invalid task data" });
    }
  });
  app2.patch("/api/love-tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await storage.updateLoveTask(id, req.body);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task" });
    }
  });
  app2.delete("/api/love-tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteLoveTask(id);
      if (!deleted) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });
  app2.get("/api/virtual-hugs", async (req, res) => {
    try {
      const hugs = await storage.getVirtualHugs();
      res.json(hugs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch virtual hugs" });
    }
  });
  app2.post("/api/virtual-hugs", async (req, res) => {
    try {
      const validatedData = insertVirtualHugSchema.parse(req.body);
      const hug = await storage.sendVirtualHug(validatedData);
      res.status(201).json(hug);
    } catch (error) {
      res.status(400).json({ message: "Invalid hug data" });
    }
  });
  app2.get("/api/complaints", async (req, res) => {
    try {
      const complaints2 = await storage.getComplaints();
      res.json(complaints2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch complaints" });
    }
  });
  app2.post("/api/complaints", async (req, res) => {
    try {
      const validatedData = insertComplaintSchema.parse(req.body);
      const complaint = await storage.createComplaint(validatedData);
      res.status(201).json(complaint);
    } catch (error) {
      res.status(400).json({ message: "Invalid complaint data" });
    }
  });
  app2.patch("/api/complaints/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const complaint = await storage.updateComplaint(id, req.body);
      if (!complaint) {
        res.status(404).json({ message: "Complaint not found" });
        return;
      }
      res.json(complaint);
    } catch (error) {
      res.status(500).json({ message: "Failed to update complaint" });
    }
  });
  app2.delete("/api/complaints/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteComplaint(id);
      if (!deleted) {
        res.status(404).json({ message: "Complaint not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete complaint" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig(({ mode }) => {
  const plugins = [react()];
  if (mode !== "production") {
    plugins.push(runtimeErrorOverlay());
    if (process.env.REPL_ID) {
      import("@replit/vite-plugin-cartographer").then(({ cartographer }) => plugins.push(cartographer())).catch(console.error);
    }
  }
  const config = {
    base: "/",
    plugins,
    optimizeDeps: {
      include: ["react", "react-dom", "wouter"]
    },
    server: {
      headers: {
        "Cache-Control": "no-cache"
      },
      fs: {
        strict: true,
        deny: ["**/.*"]
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets")
      }
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            vendor: ["wouter", "date-fns"]
          },
          // Ensure consistent chunk naming for better caching
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash][ext]"
        }
      },
      // Minify for production
      minify: "esbuild",
      // Report compressed bundle sizes
      reportCompressedSize: true
    }
  };
  return config;
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "..", "dist", "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
