import { randomUUID } from "crypto";
import {
  type LoveMessage,
  type InsertLoveMessage,
  type Reminder,
  type InsertReminder,
  type LoveTask,
  type InsertLoveTask,
  type VirtualHug,
  type InsertVirtualHug,
  type Complaint,
  type InsertComplaint,
} from "@shared/schema";

export interface IStorage {
  getLoveMessages(): Promise<LoveMessage[]>;
  getTodaysLoveMessage(): Promise<LoveMessage | undefined>;
  createLoveMessage(message: InsertLoveMessage): Promise<LoveMessage>;

  getReminders(): Promise<Reminder[]>;
  createReminder(reminder: InsertReminder): Promise<Reminder>;
  updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | undefined>;
  deleteReminder(id: string): Promise<boolean>;

  getLoveTasks(): Promise<LoveTask[]>;
  createLoveTask(task: InsertLoveTask): Promise<LoveTask>;
  updateLoveTask(id: string, updates: Partial<LoveTask>): Promise<LoveTask | undefined>;
  deleteLoveTask(id: string): Promise<boolean>;

  getVirtualHugs(): Promise<VirtualHug[]>;
  sendVirtualHug(hug: InsertVirtualHug): Promise<VirtualHug>;

  getComplaints(): Promise<Complaint[]>;
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  updateComplaint(id: string, updates: Partial<Complaint>): Promise<Complaint | undefined>;
  deleteComplaint(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private loveMessages = new Map<string, LoveMessage>();
  private reminders = new Map<string, Reminder>();
  private loveTasks = new Map<string, LoveTask>();
  private virtualHugs = new Map<string, VirtualHug>();
  private complaints = new Map<string, Complaint>();

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

  
    const loveMessages = [
      "You're the sunshine that brightens even my darkest days. ☀️",
      "Every heartbeat of mine beats only for you. 💓",
      "No matter how far we are, you're always close to my heart. 🌍💖",
      "Just thinking about you makes my day instantly better. 🥰",
      "You're not my number one. You're my only one. 💘",
     "You are the sunshine that brightens my every morning and the moonlight that soothes my every night. 🌅🌙",
  "Every heartbeat whispers your name, every breath I take is filled with love for you. 💓",
  "In a world full of temporary things, you are my forever. 💫",
  "Your smile is my favorite notification, your laugh is my favorite sound. 😊🔔",
  "You make my heart feel like it's dancing even when my feet are still. 💃❤️",
  "Being with you feels like coming home to a place I never knew I was searching for. 🏡💕",
  "You're not just my girlfriend, you're my best friend, my safe place, my everything. 🤗",
  "Every day with you is a new adventure, every moment a new reason to fall deeper in love. 🗺️💖",
  "Your love has turned my life into the most beautiful story ever written. 📖✨",
  "When I count my blessings, I count you twice - once for being you, and once for being mine. 🙏💝",
  "You are my favorite chapter in this beautiful book called life. 📚💕",
  "Your eyes hold galaxies, your touch creates magic, your love transforms everything. ✨🌌",
  "With you, I've learned that home isn't a place, it's a feeling, and you are mine. 🏠💖",
  "You are my today, my tomorrow, my always, and my forever. 💫⏰",
  "Your love is the melody that makes my heart sing the most beautiful song. 🎵💗",
  "I never believed in fate until every road led me to you. 🛣️❤️",
  "Your smile rewrites the definition of joy in my heart. 😊📝",
  "Even the stars envy the way I look at you. ✨👀",
  "You’re my constant in a world full of variables. 🔁🔢",
  "Just one hug from you makes my whole week better. 🤗💗",
  "I’d cross galaxies just to see your face light up. 🌌🌟",
  "You are the only person I want to tell everything to—no filter. 🎙️💬",
  "You’re the song that makes my heart beat in harmony. 🎶❤️",
  "Even time slows down when we’re together. 🕰️💞",
  "I’d rather argue with you than laugh with anyone else. 🔥😄",
  "You're the person my soul recognized long before we met. 🧬💕",
  "When you’re near, my world feels in perfect balance. ⚖️💖",
  "I never believed in miracles until I met you. ✨🙏",
  "Your love is my daily dose of magic. 💌🔮",
  "You’re the warmth in my coldest days. ❄️🔥",
  "I’d write your name on the moon if it meant you’d smile. 🌕🖊️",
  "You're the heartbeat I never want to skip. 💓🔁",
  "I fell for your mind just as hard as I fell for your eyes. 🧠👁️",
  "Every memory with you is a treasure I’ll never trade. 💎🕰️",
  "I never knew my favorite color until I saw you in the light. 🎨🌟",
  "You’re the peace I never knew how to ask for. ✌️💗",
  "When I’m lost, your voice is my north star. 🧭🎤",
  "I want to write books about the way you laugh. 📚😄",
  "You’re not just my person—you’re my purpose. 🫶🎯",
  "Loving you is the art my soul paints every day. 🎨❤️",
  "You’re the best decision my heart ever made. ✅💘",
  "You are the echo of my favorite dreams. 🌙🔊",
  "Even your silence speaks straight to my heart. 🤫💓",
  "You are the cozy corner of my life. ☕🛋️",
  "Every love song finally makes sense because of you. 🎼💗",
  "You made me believe that happy endings aren’t just in books. 📖🏰",
  "You’re the only addiction I never want to break. 💉💞",
  "Your name is written in every wish I make. 🌠📝",
  "You’re not just loved—you’re worshiped by every part of me. 🙇❤️",
  "You turned my ordinary life into something extraordinary. 🌈🌟",
  "You’re the color I didn’t know my world was missing. 🌈🖌️",
  "No GPS needed—my heart already knows the way to you. 📍💖",
  "I’d rather have a moment with you than a lifetime without. 🕰️❤️",
  "You're my secret favorite everything. 🤫💘",
  "You hold the key to every closed part of me. 🗝️💓",
  "Your love doesn’t just touch me—it transforms me. 🔄❤️",
  "You make my worst days feel like they had a reason—to lead me to you. 🌧️➡️☀️",
  "Loving you is my most natural instinct. 🐾💓",
  "You taught me that real love is felt, not explained. 🧠🚫💘",
  "You're the reason my walls are now windows. 🧱➡️🪟",
  "I’d choose your chaos over anyone else’s calm. 🌪️💗",
  "You make me feel like the only person on the planet. 🌍🫶",
  "You are my unexpected favorite. 🎁💘",
  "I’d relive every pain if it meant getting to love you again. 💔🔁❤️",
  "You’re not just special—you’re sacred. ✨🙏",
  "You’re the “forever” that I used to roll my eyes at. ♾️👀",
  "You're my calm, my storm, my in-between. 🌤️💓",
  "You make being vulnerable feel safe. 🛡️💖",
  "I’d get lost with you, just to never be found. 🧭🌲",
  "I want to memorize every curve of your voice. 🗣️🎵",
  "Your love is the kind that rewires hearts. 💘🔧",
  "You make me want to be softer, slower, sweeter. 🍯💗",
  "You’re the fairytale I never thought I’d live. 🏰📚",
  "You are the place where all my fears rest. 😌🛌",
  "I want to build a life where every wall has your laughter in it. 🧱😄",
  "The world feels right when your hand is in mine. 🖐️🤝",
  "I’d rather be wrong with you than right alone. ❌❤️",
  "You're the exhale after a long day. 🌬️😌",
  "You’re the one I want to tell my boring stories to. 📖😂",
  "Even my dreams feel empty without you in them. 🌙💭",
  "I love the way you make time feel slower, softer, sweeter. 🕰️💞",
  "Every path I take, I hope leads to you. 🛤️💓",
  "You’re the candle that lit up all the dark corners in me. 🕯️❤️",
  "You're my favorite hello and the hardest goodbye. 👋💘",
  "I didn’t find you—you found me, and changed everything. 🔍💖",
  "You’re the sky I want to watch every sunset with. 🌅💑",
  "You're not my other half—you’re the full heart I never had. 💯❤️",
  "If my heart could write, it would only write your name. 📝💓",
 "I could spend my entire life tracing the lines of your hands and still find something new to love in every curve. ✋❤️",
  "The way your eyes look at me feels like a lifetime of love in a single glance. 👁️💘",
  "I’ve had good days and bad ones, but nothing compares to the days I spend just being near you. 🗓️💕",
  "You didn’t just enter my heart—you built a home there. 🏡💓",
  "Every time you speak, my soul leans in like it’s hearing its favorite song. 🎶🫀",
  "I’d relive every heartbreak just to meet you again. 🔁💔❤️",
  "When you laugh, the world stops for a moment—and I never want it to start again. 😂⏳",
  "I don’t dream about perfect people—I dream about imperfect people who feel like home. Like you. 💤💖",
  "You’re the story I’d write a thousand times and never get tired of telling. 📖✍️",
  "Even forever feels too short when it comes to loving you. ♾️❤️",
  "I didn’t fall in love—I walked in, eyes open, knowing there was no way out I’d ever take. 🚪💘",
  "You turn rainy days into moments I want to hold onto forever. 🌧️🫶",
  "Some people come into your life as blessings. You came in as everything. 🙏💫",
  "I’d pause the world just to spend one more minute staring at your smile. ⏸️😊",
  "You’re not just a part of my life—you’re the reason it feels whole. 🧩💗",
  "Your love doesn’t just hold me—it heals me. 🩹💞",
  "I never needed fireworks when I had the spark in your eyes. 🎆👀",
  "You make the silence between words feel more romantic than any poem. 🤫📝",
  "You’re the wish I didn’t know I was making, answered before I even asked. 🌠❤️",
  "I could fill oceans with everything I feel when you look at me. 🌊💓",
  "You are not a coincidence—you are the most beautiful inevitability. 🎯💘",
  "You make even my ugliest days feel like they were worth it, just to end with your voice. 🗓️🎤",
  "When you speak my name, it feels like a sacred prayer. 🙏🩷",
  "I didn’t choose you just once. I choose you every day, every hour, every heartbeat. 🕰️💗",
  "I don’t care where we go, as long as your hand is in mine. 🤝🌍",
  "There are galaxies in your smile and peace in your presence. 🌌😊",
  "You’re the morning I want to wake up to for the rest of my life. ☀️💓",
  "You don't just light up a room—you make the walls lean in to listen. 🕯️🏠",
  "I want to learn every language just to tell you “I love you” in a thousand ways. 🗣️❤️",
  "Your love is the poetry my heart never knew it was writing. 📝💘",
  "Sometimes I just stare at you and smile—not because of what you’re doing, but because of who you are. 😊👀",
  "I don't want the perfect life—I want the imperfect one we build together. 🛠️💑",
  "You’re the gravity that keeps my heart from floating away. 🌍🧲",
  "I never believed in signs until the universe gave me you. 🪐📩",
  "You don’t complete me—you elevate me. ⬆️💗",
  "I’d write you a hundred love letters if I thought it would make you smile once more. 💌📬",
  "There are a million versions of love, but yours is the only one that makes sense to me. 🧠❤️",
  "You make even 2 a.m. feel like a sunrise. 🌅🕑",
  "I don’t just want to grow old with you—I want to grow kinder, braver, and more loving with you. 👵💘👴",
  "Your name is the only word my heart spells correctly every time. 🫀🔤",
  "Some people write songs about love. I just think about you. 🎼🩷",
  "You turn mundane moments into memories I’ll carry forever. 🛒❤️",
  "Every little detail about you feels like it was made just for me. 🧩💖",
  "My favorite part of the day is knowing I get to love you through it. 🕰️💑",
  "Your arms are my safe place, no matter how far the world pulls us. 🤗🌍",
  "You are both the calm and the chaos—and I love you for both. ⚡🕊️",
  "If my love had a sound, it would be your name whispered into forever. 🎤♾️",
  "You’re not just loved—you’re honored. 👑❤️",
  "You don’t even have to try—you’re already everything. 🌟",
  "When I met you, my definition of happiness rewrote itself. 📝😊",
  "You turn my nervousness into butterflies, and my butterflies into belief. 🦋🙏",
  "You are my heart’s favorite reason to beat. ❤️🎵",
  "You’re the person I look for in every crowd—even when I know you’re not there. 👀💘",
  "Every second we spend apart feels like time is punishing me for loving you this much. ⌛💔",
  "I want to love you like the moon loves the tide—endlessly, silently, and with devotion. 🌕🌊",
  "I’d rather have one lifetime with you than eternity with someone else. 🕰️♾️",
  "You are the punctuation in every sentence of my heart. 📝❤️",
  "I didn’t fall in love with your beauty. I fell in love with how beautiful you made me feel. 💐💞",
  "Your voice could bring peace to wars my heart didn’t know it was fighting. 🎤🛡️",
  "You make the passing of time feel like a blessing, not a countdown. ⏳🫶",
  "Every breath I take is a silent thank you to the universe for giving me you. 🌌💨",
  "You are the treasure I didn’t know I was hunting for. 🪙🏴‍☠️",
  "You don’t just live in my heart—you’ve redecorated it. 🛋️❤️",
  "Your soul speaks a language my heart always understood. 🫀🗣️",
  "I used to believe love was complicated. Then I met you—and it became simple. 🤍",
  "You bring color to days I didn’t even realize were grey. 🌈🌫️",
  "You are my best friend, my safe space, my once-in-a-lifetime. 👫💖",
  "There’s no version of the future that feels right without you in it. 🛣️💑",
  "I didn’t just find love in you—I found the courage to believe in it again. 💪💘",
  "You make all my broken pieces feel like part of a beautiful mosaic. 🧩🎨",
  "You’re the chapter my heart had been waiting for. 📖❤️",
  "The stars look different now—because one of them walked into my life. ✨🚶‍♀️",
  "I love you more than yesterday, less than tomorrow, and not even close to forever. 🕰️❤️♾️",
"I could search the universe and never find another heart that fits mine like yours. 💫",
  "Your laughter is the melody my soul plays on repeat. 🎶",
  "You walked into my life and turned every ordinary moment into magic. ✨",
  "I didn’t know what home felt like until you held me. 🏡",
  "The way your eyes light up when you smile—pure poetry. 📖",
  "You’re not just in my thoughts—you’ve built a castle there. 🏰",
  "Even silence feels romantic when I’m with you. 🤍",
  "Your presence is the peace I never knew I needed. 🕊️",
  "My favorite part of the day is the moment I see your name pop up. 📱💓",
  "Loving you is like breathing—effortless and constant. 🌬️",
  "Your hugs feel like my heart finally found its rhythm. 🤗",
  "In your eyes, I see the love story I never dreamed I’d get. 💞",
  "I don’t believe in perfect people, but I do believe in perfect for me. That's you. 💘",
  "My favorite moments are the ones where we’re doing nothing, but it means everything. 💭",
  "You make even the moon jealous of how much I adore you. 🌙💗",
  "Every day with you feels like a handwritten love letter from the universe. 💌",
  "I love you more than words—and I know all the best ones. 📚",
  "You turned my “some day” into “right now.” ⏳💖",
  "You didn’t just steal my heart—you built a garden in it. 🌷",
  "You’re not a chapter in my life—you’re the whole book. 📘",
  "I fall in love with your soul a little more every single day. ✨",
  "When I say “I love you,” I’m also saying “thank you.” 🙏❤️",
  "With every heartbeat, my love for you deepens. 🔂",
  "I’d choose you in every lifetime, without hesitation. ♾️",
  "You make love feel like the safest place in the world. 🛡️💓",
  "Your voice is my favorite sound, even when you’re just reading the menu. 🥰",
  "I want to grow old with you, laughing over memories we haven't made yet. 🧓👵",
  "You turn my insecurities into things I learn to love. 🪞",
  "You see the best in me—even when I can’t. 💫",
  "Every second with you is worth a thousand without. ⏱️💗",
  "You bring out a version of me I always dreamed I could be. 🌟",
  "I don’t need paradise, I just need five minutes with you. 🌴💘",
  "Loving you feels like writing poetry in the stars. 🌌🖋️",
  "You taught me what forever feels like in a moment. ⏳💑",
  "You make ordinary days feel like fairy tales. 📖✨",
  "I’d rather spend one lifetime with you than face all the ages of this world alone. ⌛",
  "You don’t complete me—you make me overflow. 💧❤️",
  "You’re the calm in my chaos and the light in my storm. ⛈️☀️",
  "Just one smile from you is enough to change my whole day. 😊",
  "If love is a language, you’re the only one I want to be fluent in. 🗣️💞",
  "I never believed in soulmates until you looked at me like that. 👀💘",
  "You’re the sunrise I want to wake up to for the rest of my life. 🌅",
  "If kisses were stars, I’d send you the galaxy. 💋🌠",
  "You don’t even try, yet you heal every broken part of me. 🩹",
  "Being in love with you is my favorite form of happiness. 🌻",
  "I could spend forever staring into your eyes and still not find an end. 👁️♾️",
  "You are the story I want to tell the universe about. 🌌📖",
  "You make me believe that forever isn’t long enough. 🔒",
  "You are the wish my heart made when I didn't even know I was wishing. 🌠❤️",
  "You love me in ways I never thought I deserved. 💗",
  "I crave your voice more than my favorite song. 🎧💓",
  "Your love is the safest place I’ve ever known. 🛏️💞",
  "You’re not just my person—you’re my peace. ☮️",
  "Everything feels better when you’re near. Even the bad days. 🌧️☀️",
  "I’m never more alive than when I’m with you. 💓",
  "Your hand in mine is the only map I need. 🗺️🤝",
  "With you, forever doesn’t feel long—it feels just right. 🕰️💑",
  "I don’t need fireworks; your smile lights up my whole world. 🎇",
  "You’re the dream I get to live wide awake. 💭💖",
  "Even your flaws are beautiful to me. 💘",
  "You’re not perfect, but you’re perfect for me. 💯",
  "Just thinking about you makes my heart race. 🏁💓",
  "I love you more than I love Sunday mornings and coffee—and that’s saying a lot. ☕",
  "If I had one wish, it would be to relive our first kiss every day. 💋",
  "My favorite adventure is loving you. 🧭❤️",
  "You inspire me to be kinder, softer, better—just by existing. 🌷",
  "You’re not just part of my story—you’re the title. 📘",
  "You are the spark that lit a fire I never want to put out. 🔥",
  "I didn’t know I needed you—until you showed up and changed everything. 🪄",
  "Your love is the kind that poets try to write and fail. 📝💔",
  "I’d rather hold your hand than hold the stars. 🌌🤝",
  "You are the rhythm that keeps my heart dancing. 💃🫀",
  "No matter how many lifetimes I live, I’ll always look for you. ♾️❤️",
"You didn’t just steal my heart—you gave it a place to grow. 🌱💓",
  "Every time you say my name, the world feels a little softer. 🌍💬",
  "Loving you feels like waking up in the middle of a dream I never want to end. 💭☀️",
  "You turned all my scars into stories I’m proud to tell. 🩹📖",
  "When you’re near, even silence becomes my favorite song. 🎶🤍",
  "You don’t just make me feel loved—you make me feel celebrated. 🎉💘",
  "If love was a scent, yours would linger in every breath I take. 🌸💨",
  "You're not just part of my happiness—you’re the root of it. 🌳❤️",
  "I didn’t know what I was missing until you filled the empty spaces in me. 🧩💓",
  "With every glance, you rewrite what love means to me. ✍️👀",
  "You're the part of my daydreams I never want to wake from. 😴💗",
  "I never imagined someone could feel like both home and adventure. 🏡🧭",
  "You don’t just understand me—you *feel* me. Deeply. 💞🌊",
  "You are the line my heart recites in every heartbeat. 📜🫀",
  "Even in a room full of stars, you’d still be the one shining. 🌌✨",
  "You're not a spark—you’re a wildfire in my soul. 🔥❤️",
  "With you, love isn’t a feeling. It’s a reality I live in. 🏠💘",
  "You don’t just love me—you make me want to love myself. 🪞💖",
  "Your love turns every flaw of mine into something worthy. 💔✨",
  "You’re my calm in chaos, my whisper in the noise. 🌪️🤫",
  "You didn’t just open my heart—you gave it wings. 🪽💗",
  "Even the darkest nights feel safer with your name in my heart. 🌙❤️",
  "You make time feel like a poem—each second full of meaning. ⏳📖",
  "You're the warmth in my cold hands and the light in my quiet soul. 👐🌟",
  "You are every wish I whispered into pillows and stars. 🌠🛏️",
  "You're not a habit—I’ll never tire of loving you. 🔁💓",
  "Even when we’re apart, I still feel wrapped in your presence. 📦💞",
  "You make love feel less like a word and more like an atmosphere. 💬🌤️",
  "I’ve stopped looking at the stars. You outshine them all. ✨🙈",
  "You're the laugh in my favorite memory and the hug I never forget. 🫂💭",
  "You're not just someone I love—you’re the someone I *choose*. Every time. 🔄❤️",
  "You don’t just make me believe in love—you make me believe in *us*. 🤝💘",
  "You’re not a part of my world—you *are* my world. 🌎💖",
  "You are the warmth I wrap myself in when life gets cold. 🧣❤️",
  "Your voice is my peace and your silence is still full of love. 🗣️🤍",
  "When I see you, I see the future I want. And the now I adore. 🔮💑",
  "You taught my heart how to dance again. 💃🫀",
  "Every “I love you” from you feels like the first. ✨🔁",
  "You’re the safest adventure I’ve ever taken. 🧭🏰",
  "Even your chaos feels like a symphony in my chest. 🎻💓",
  "You make my bad days worth surviving and my good days unforgettable. 🌧️☀️",
  "You gave me a forever in moments I never expected. 🕰️💘",
  "You are the quiet kind of love that speaks louder than anything else. 🤫❤️",
  "My heart has never felt more at home than it does with you. 🏠🫶",
  "You’re not a dream—I know, because I never want to wake up from you. 😴💭",
  "Even the things I once feared feel gentler with your love around me. 🛡️💞",
  "Your love is the reason I now believe in magic again. ✨🎇",
  "You don’t make me feel like a better person—you remind me I always was. 💡💘",
  "You are the only part of forever I never question. ⏳♾️",
  "You’re not my other half—you’re my every piece in full. 🧩❤️",
  "Even the silence between us is filled with meaning. 🤍🔕",
  "If I had to relive my life a thousand times, I’d always find my way back to you. 🔁💓",
  "You don’t complete my story—you write it with me. 📖✍️",
  "You’re not the reason I smile—you’re the reason I *feel* it. 😊🫀",
  "You’re the place I find myself when the world doesn’t make sense. 🌎🔍",
  "You aren’t a spark—you’re the whole constellation. 🌌💖",
  "You’re not a page in my book—you’re the ink itself. 🖋️📚",
  "Even a second with you feels like a moment stolen from heaven. ⏱️🌤️",
  "You're not just beautiful—you make beauty feel small. 💘💫",
  "You hold my love like it’s sacred. And I hold you like you’re everything. 🙏❤️",
  "You're the rhythm my heart had been waiting to hear. 🫀🎵",
  "You don’t just love me—you see me. Really, truly see me. 👁️🩷",
  "Even the quietest night feels full when I know you’re mine. 🌌🌙",
  "You are every reason, every hope, every heartbeat I’ve ever had. ❤️🫶",
  "You didn't change me—you reminded me who I really am. 🪞💓",
  "Even when I feel lost, loving you is the one thing that’s always clear. 🧭❤️",
  "You make ordinary love stories feel like legends. 📜✨",
  "You’re not the light at the end of the tunnel—you’re the one holding it for me. 🕯️👣",
  "You're my favorite feeling in the world—and I never want to lose it. 🌍💘",
  "You’re the final line in every prayer I’ve whispered. 🙏💖",
  "Even time slows down to admire you when you smile. ⏳😊",
  "You’re the one thing I never want to unlearn. 🧠❤️",
  "You are the poem I’ve always been trying to write. ✍️💘",
  "You’re the only forever that feels too short. ♾️🫀",
  "No matter how long I live, no moment will ever beat the first time you said my name. 🔊💓",
  "You’re not just a person—you’re a feeling. The best one I know. 🥹💞",
  "Your love is the reason I now believe in second chances. 🔄💖",
  "Even after all this time, you still leave me breathless. 😮‍💨❤️",
  "You’re not just my person—you’re the reason I am who I am today. 🌱💓",
  "No poem, song, or line will ever say “I love you” better than the way I look at you. 👁️❤️",
    ];

    const todaysMessageIndex = dayOfYear % loveMessages.length;
    for (let i = 0; i < loveMessages.length; i++) {
      await this.createLoveMessage({ 
        message: loveMessages[i], 
        isActive: i === todaysMessageIndex 
      });
    }

    await this.initializeDailyReminders(dayOfYear);

 
    const allTasks = [
      "Say 'I love you' first thing",
      "Send a cute GIF 💌",
      "Plan a sweet message",
      "Recall a shared memory 📸",
      "Draw a doodle for them ✏️",
        "Drink 8 glasses of water 💧", 
  "Eat something delicious 🍽️",
"Take 3 deep breaths 🫁",
 "Send me a cute selfie 📸", 
 "Tell me about your day 💬", 
  "Do something that makes you smile 😊", 
  "Give yourself a compliment 💕", 
 "Listen to your favorite song 🎵",
"Stretch for 5 minutes 🧘‍♀️", 
  "Write down one thing you're grateful for ✨",
   "Take a 10-minute walk 🚶‍♀️", 
 "Send a sweet message to someone you love 💌", 
 "Organize one small thing 🧺", 
  "Put your phone away for 30 mins 📵",
"Look at the sky for 1 minute ☁️", 
   "Smile at yourself in the mirror 🪞",
  "Draw a doodle 🎨",
   "Eat a fruit 🍎",
 "Hug your pillow tight 🤗",
  "Play your favorite game 🎮", 
  "Look at old happy photos 🖼️", 
 "Say 'I love myself' out loud 💗",
  "Play with your hair or style it 💇‍♀️",
   "Make your bed nicely 🛏️",
 "Do 10 jumping jacks 🤸‍♀️",
  "Wash your face with love 🧼",
 "Light a candle or smell something nice 🕯️", 
   "Read 1 page of a book 📖",
  "Write me a cute thought 📝", 
  "Set one small goal for tomorrow 🎯", 
    ];

    const todayTaskIndexes = [0, 1, 2].map(i => (dayOfYear + i) % allTasks.length);
    for (let i = 0; i < todayTaskIndexes.length; i++) {
      const taskIndex = todayTaskIndexes[i];
      await this.createLoveTask({ 
        title: allTasks[taskIndex], 
        order: i + 1,
        isCompleted: false 
      });
    }
  }

  private async initializeDailyReminders(dayOfYear: number) {
   
    const allReminders = [
      "Drink water! 💧",
      "Send a sweet text 💌",
      "Smile at your reflection 😊",
      "Hug someone today 🫂",
      "Stretch and breathe 🌬️",
      "Write a gratitude note ✍️",
     "Remember to smile today - your smile is someone's sunshine! ☀️😊",
  "You are beautiful exactly as you are. Never forget your worth! 👑✨",
  "Take a moment to breathe deeply and appreciate this beautiful day. 🌸🫁",
  "Your kindness makes the world a brighter place. Keep spreading love! 💫❤️",
  "Don't forget to drink water and take care of your amazing self! 💧🌿",
  "You are stronger than you know and braver than you feel. 💪🦋",
  "Every challenge today is just making you more amazing. You've got this! 🌟💪",
  "Remember to be gentle with yourself - you're doing better than you think. 🤗💕",
  "Your dreams are valid and your goals are achievable. Keep going! 🎯✨",
  "You bring so much joy to those around you. Thank you for being you! 🌈💖",
  "Today is a perfect day to celebrate how wonderful you are. 🎉💝",
  "Your heart is full of love, and the world is lucky to have you in it. 💕🌍",
  "Remember that you are loved, cherished, and appreciated beyond measure. 🥰💖",
  "Take time to do something that makes your soul happy today. 🌸😌",
  "You are a gift to this world, and I'm grateful for you every single day. 🎁💕",
   "Let today be a reminder that even your smallest steps are signs of courage. 🫶",
  "You are not behind—you are exactly where your journey is meant to unfold. 🌸",
  "Drink water, stretch your body, and be kind to your mind today. 🌸",
  "Celebrate the little joys—your favorite song, warm sunlight, or even deep breaths. 🌼",
  "You don't have to do everything today. Just what matters most to your peace. 💖",
  "Speak to yourself with the same love you give so freely to others. 🌸",
  "Some days are made for healing, not hustling. Rest is productive too. 🌻",
  "Your existence adds meaning to this world in ways you may never see. 🌼",
  "You have faced hard things and still found ways to bloom. That’s strength. 🫶",
  "It’s okay to slow down. You are not a machine—you are a miracle. 🌈",
  "Let yourself feel joy today, without guilt or hesitation. 🥰",
  "Breathe in peace, breathe out pressure. You are doing just fine. 😌",
  "Progress doesn’t always look loud. Sometimes it’s soft and silent and still powerful. 🌿",
  "Your worth isn’t tied to how much you accomplish—it's in who you are. 🌸",
  "Let today be the day you forgive yourself just a little more. 💞",
  "Take a moment to smile at yourself in the mirror. That face is loved. ☀️",
  "You’re allowed to have quiet days. You’re still growing even in rest. 🌼",
  "Your dreams don’t have an expiration date—move at your pace. ✨",
  "Drink some water and talk to yourself like someone you love deeply. 💖",
  "You’ve come further than you think. Trust your steps. 💫",
  "Joy is not something you have to earn—it’s something you’re allowed to feel. 🌞",
  "Gentleness is not weakness. It’s how wildflowers survive storms. 🌻",
  "Just because it’s hard doesn’t mean you’re doing it wrong. ❤️",
  "There is no shame in asking for help. It’s brave and beautiful. 🫶",
  "Today, be softer with yourself. You’ve carried so much. 🌷",
  "Breathe. Hydrate. Remind yourself: you're trying, and that matters. 💧",
  "Healing isn't linear, and that's perfectly okay. 🌿",
  "You are not a burden. You are someone learning how to bloom. 🌸",
  "Celebrate that you got out of bed. That’s a win. ✨",
  "Give yourself space to be human. That includes the messy parts. 🤍",
  "One step forward, even if it's small, is still a victory. 🦋",
  "You are more than your mistakes—you are growth in motion. 🌼",
  "A deep breath can shift your entire day. Take one now. 😌",
  "You’re allowed to not have it all figured out. None of us do. 🫶",
  "The world is softer because you're in it. 🌎",
  "Your smile has healing power—even for yourself. 😊",
  "You're doing enough. In fact, you're doing great. 💫",
  "You don’t need to prove your worth—it already exists. 🌸",
  "There is nothing wrong with needing rest. Honor that need. 🛏️",
  "Your kindness is seen, even when it feels unnoticed. 💖",
  "Trust that being yourself is more than enough. 🌼",
  "You don't need permission to rest. You are allowed to exhale. 😮‍💨",
  "Even on quiet days, your heart still speaks loudly in love. ❤️",
  "You’re not behind—you’re on your own beautifully timed path. ⏳",
  "Let your breath guide you back to the present moment. 🧘‍♀️",
  "Your peace matters more than perfection. 🌿",
  "Remember, self-care isn’t selfish—it’s survival. 💕",
  "It's okay to be a work in progress. Art takes time. 🎨",
  "Today, treat yourself like someone you would protect. 🛡️",
  "Your voice matters, even if it shakes. 🎤",
  "You bring color into this world just by being you. 🌈",
  "Happiness often hides in small things. Go looking. 🐞",
  "You don’t need a reason to rest. Needing it is enough. 😌",
  "You are worthy of love on your best and worst days. 💝",
  "Tiny moments of peace can shift your whole day. 🌸",
  "Not every day has to be productive to be meaningful. 🌤️",
  "You’ve already survived so much. You’re stronger than you know. 💪",
  "Your love for others is powerful—don’t forget to give some to yourself. ❤️",
  "Honor your feelings today without judging them. 🌿",
  "Even your quiet presence is a gift to those who love you. 🫶",
  "The world needs your softness just as much as your strength. 🌻",
  "It’s okay to unplug and choose silence for a while. 🔇",
  "Let joy sneak in between the cracks of your busyness. ✨",
  "Your healing doesn’t have to make sense to anyone else. 💫",
  "You can take up space. In fact, you’re meant to. 🌈",
  "You’re still enough, even when you don’t feel like it. 💖",
  "You matter. Every single day. 🧡",
  "Let yourself be loved—even by your own heart. ❤️",
  "Rest is the bridge between effort and magic. 🌉",
  "It's okay if today is quiet. Stillness is sacred too. 🌙",
  "You’re not broken—you’re becoming. 🌱",
  "Gentle progress is still progress. ✨",
  "Every sunrise is proof you get to try again. 🌅",
  "You’re allowed to celebrate yourself, loudly or quietly. 🎉",
  "You are a story unfolding, and it’s already beautiful. 📖",
  "Today is a chance to love yourself better than yesterday. 💓",
  "Breathe deep—you’re still here. That’s no small thing. 🫁",
  "Even your softest efforts are meaningful. 🌼",
  "The only approval you truly need is your own. ✔️",
  "Rest. Reflect. Recharge. Repeat if needed. 🔁",
  "Joy is your birthright. Don’t forget that. 🌞",
  "The best things grow slowly—so are you. 🌿",
  "Peace begins with a single breath. Take one now. 😮‍💨",
  "There’s beauty in your becoming. ✨",
  "You were never meant to rush. Honor your pace. ⌛",
  "Compassion starts with how you speak to yourself. 💞",
  "You don’t have to shine every day to still be light. 💡",
  "There’s nothing lazy about listening to your body. 🛏️",
  "You are both the seed and the bloom. Let that inspire you. 🌷",
  "Every feeling deserves to be felt. Let them flow. 💧",
  "You are enough. Always have been, always will be. ❤️",
  "What you’re doing today is shaping the strength of tomorrow. 💪",
  "Let the softness in you be louder than the noise outside. 🎧",
  "You’re not falling behind—you’re unfolding. 🌸",
  "Water yourself with kindness today. 💦",
  "The way you love matters more than you think. 💖",
  "Your gentle heart is needed in this world. 🫶",
  "Even on days of doubt, your light still reaches someone. 🌟",
  "Allow yourself to rest—not to quit, but to continue. 🔄",
  "Celebrate how far you’ve come—quietly or boldly. 🥳",
  "You are made of resilience, wrapped in love. 🧡",
  "Speak to your soul like it’s sacred. Because it is. 💫",
  "Today, you get to start again—with grace. 🌅",
    ];

    const indexes = [0, 1, 2].map(i => (dayOfYear + i) % allReminders.length);
    for (const i of indexes) {
      await this.createReminder({ 
        title: allReminders[i],
        isCompleted: false 
      });
    }
  }

  async getLoveMessages(): Promise<LoveMessage[]> {
    return Array.from(this.loveMessages.values()).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getTodaysLoveMessage(): Promise<LoveMessage | undefined> {
    return Array.from(this.loveMessages.values()).find(msg => msg.isActive);
  }

  async createLoveMessage(insertMessage: InsertLoveMessage): Promise<LoveMessage> {
    const id = randomUUID();
    const message: LoveMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      imageUrl: insertMessage.imageUrl ?? null,
      isActive: insertMessage.isActive ?? true,
    };
    this.loveMessages.set(id, message);
    return message;
  }

  async getReminders(): Promise<Reminder[]> {
    return Array.from(this.reminders.values()).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createReminder(insertReminder: InsertReminder): Promise<Reminder> {
    const id = randomUUID();
    const reminder: Reminder = {
      ...insertReminder,
      id,
      createdAt: new Date(),
      description: insertReminder.description ?? null,
      isCompleted: insertReminder.isCompleted ?? false,
    };
    this.reminders.set(id, reminder);
    return reminder;
  }

  async updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | undefined> {
    const reminder = this.reminders.get(id);
    if (!reminder) return undefined;
    const updatedReminder = { ...reminder, ...updates };
    this.reminders.set(id, updatedReminder);
    return updatedReminder;
  }

  async deleteReminder(id: string): Promise<boolean> {
    return this.reminders.delete(id);
  }

  async getLoveTasks(): Promise<LoveTask[]> {
    return Array.from(this.loveTasks.values()).sort((a, b) => a.order - b.order);
  }

  async createLoveTask(insertTask: InsertLoveTask): Promise<LoveTask> {
    const id = randomUUID();
    const task: LoveTask = {
      ...insertTask,
      id,
      createdAt: new Date(),
      description: insertTask.description ?? null,
      isCompleted: insertTask.isCompleted ?? false,
      order: insertTask.order ?? 0,
    };
    this.loveTasks.set(id, task);
    return task;
  }

  async updateLoveTask(id: string, updates: Partial<LoveTask>): Promise<LoveTask | undefined> {
    const task = this.loveTasks.get(id);
    if (!task) return undefined;
    const updatedTask = { ...task, ...updates };
    this.loveTasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteLoveTask(id: string): Promise<boolean> {
    return this.loveTasks.delete(id);
  }

  async getVirtualHugs(): Promise<VirtualHug[]> {
    return Array.from(this.virtualHugs.values()).sort((a, b) => new Date(b.sentAt!).getTime() - new Date(a.sentAt!).getTime());
  }

  async sendVirtualHug(insertHug: InsertVirtualHug): Promise<VirtualHug> {
    const id = randomUUID();
    const hug: VirtualHug = {
      ...insertHug,
      id,
      sentAt: new Date(),
      message: insertHug.message ?? null,
      hugType: insertHug.hugType ?? "warm",
    };
    this.virtualHugs.set(id, hug);
    return hug;
  }

  async getComplaints(): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createComplaint(insertComplaint: InsertComplaint): Promise<Complaint> {
    const id = randomUUID();
    const complaint: Complaint = {
      ...insertComplaint,
      id,
      createdAt: new Date(),
      status: insertComplaint.status ?? "open",
    };
    this.complaints.set(id, complaint);
    return complaint;
  }

  async updateComplaint(id: string, updates: Partial<Complaint>): Promise<Complaint | undefined> {
    const complaint = this.complaints.get(id);
    if (!complaint) return undefined;
    const updatedComplaint = { ...complaint, ...updates };
    this.complaints.set(id, updatedComplaint);
    return updatedComplaint;
  }

  async deleteComplaint(id: string): Promise<boolean> {
    return this.complaints.delete(id);
  }
}

export const storage = new MemStorage();

