export const initialProjects = [
    {
        id: 1,
        slug: "weekly-report-automation",
        title: "Weekly Report Automation",
        subtitle: "Enterprise reporting dashboard with automated sentiment analysis & multi-source document ingestion.",
        category: "AI PIPELINE",
        liveBadge: "AI & NLP ENGINE",
        metaFooter: "2024 / FULL STACK / AI PIPELINE",
        ctaText: "CASE STUDY",
        deviceType: "laptop",
        timeline: "4 Months / 2024",
        role: "Lead Full-Stack & ML Engineer",
        client: "Enterprise Operations",
        status: "Production Deployed",
        price: 0,
        image_url: "/projects/weekly-report.jpg",
        tech_stack: "PYTHON, NLP, FASTAPI, PYTORCH, CI/CD",
        techBadges: ["PYTHON", "NLP", "FASTAPI", "PYTORCH", "CI/CD"],
        description: "Enterprise reporting dashboard with automated sentiment analysis, automated data extraction, generating actionable insights from hundreds of spreadsheets and documents. Custom-trained summarization pipeline.",
        overview: "A mission-critical enterprise intelligence system engineered to eliminate manual report synthesis. The platform automatically ingests, normalizes, and extracts actionable insights from hundreds of distributed spreadsheets, client feedback logs, and operational reports each week. Leveraging custom fine-tuned transformer models, it produces executive summaries with quantified sentiment metrics and anomaly detection in seconds.",
        impactStats: [
            { value: "99.4%", label: "Extraction Accuracy" },
            { value: "12x", label: "Faster Report Turnaround" },
            { value: "450+", label: "Weekly Docs Processed" },
            { value: "< 1.5s", label: "Pipeline Latency" }
        ],
        challenges: [
            "Heterogeneous data formats across disparate departments (Excel, PDF, CSV, unstructured emails).",
            "Latency bottlenecks when running multi-stage NLP models over hundreds of weekly documents.",
            "Requirement for strict enterprise data privacy and deterministic summary audits."
        ],
        solutions: [
            "Built an asynchronous ingestion worker pool using FastAPI and Celery with Redis queue buffering.",
            "Distilled and quantized a domain-specific PyTorch NLP transformer to achieve sub-second document scoring.",
            "Created an interactive React dashboard with drill-down audit trails for every extracted metric."
        ],
        architecture: "Distributed microservices architecture utilizing FastAPI for inference endpoints, PostgreSQL with pgvector for semantic caching, and a containerized Docker pipeline orchestrated with automated CI/CD validation.",
        keyFeatures: [
            {
                title: "Automated Document Ingestion",
                description: "Seamless parsing and schema normalization across PDF, XLSX, and CSV with schema drift detection."
            },
            {
                title: "Custom NLP Summarization",
                description: "Fine-tuned transformer pipeline that condenses 40-page operational logs into executive action points."
            },
            {
                title: "Multi-Dimensional Sentiment Analysis",
                description: "Categorizes stakeholder feedback into sentiment scores, urgency levels, and departmental tags."
            },
            {
                title: "Executive Export Suite",
                description: "One-click generation of branded PDF and PowerPoint executive decks with live vector charts."
            }
        ],
        techDetails: {
            frontend: ["React.js", "Tailwind CSS", "Framer Motion", "Recharts"],
            backend: ["FastAPI", "Python 3.11", "Celery", "Redis"],
            ai_ml: ["PyTorch", "Hugging Face Transformers", "NLTK", "SpaCy"],
            database: ["PostgreSQL", "SQLAlchemy"],
            devops: ["Docker", "GitHub Actions", "Nginx", "Linux Server"]
        },
        codeSnippet: `async def generate_weekly_summary(batch_id: str, db: Session):
    documents = await document_loader.fetch_batch(batch_id)
    embeddings = embedding_engine.encode([doc.content for doc in documents])
    sentiment_scores = sentiment_classifier.predict(embeddings)
    summary = summarizer.generate_action_points(embeddings, max_tokens=500)
    return ReportResponse(
        summary=summary, 
        sentiment_index=sentiment_scores.mean(),
        processed_count=len(documents)
    )`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    },
    {
        id: 2,
        slug: "qr-studio-generator-platform",
        title: "QR Studio — Custom QR Code Generator & Design Platform",
        subtitle: "A modern, full-stack QR Code Generator and customization platform with vector rendering & analytics.",
        category: "HOSPITALITY TECH",
        liveBadge: "LIVE SYSTEM",
        metaFooter: "2024 / FULL STACK",
        ctaText: "LIVE DEMO",
        deviceType: "laptop",
        timeline: "3 Months / 2024",
        role: "Full-Stack Engineer & UI/UX Designer",
        client: "Product Launch / Open Source",
        status: "Production Deployed",
        price: 0,
        image_url: "/projects/qr-studio.jpg",
        tech_stack: "REACT, TAILWIND CSS, POSTGRESQL, SOCKET.IO",
        techBadges: ["REACT", "TAILWIND CSS", "POSTGRESQL", "SOCKET.IO"],
        description: "A modern, full-stack QR Code Generator and customization platform that enables users to create high-resolution custom vector QR codes (SVG, PNG, EPS) with custom branding, analytics, and dynamic redirect capabilities.",
        overview: "QR Studio is a professional-grade design utility and redirect engine. Unlike generic generators that produce pixelated outputs, QR Studio renders pixel-perfect vector geometry with customizable gradient eye patterns, embedded brand emblems, error-correction tuning, and real-time scan analytics. Built to handle enterprise marketing campaigns and contactless operations.",
        impactStats: [
            { value: "4K+", label: "Vector QR Exports" },
            { value: "100%", label: "Lossless Scalability (SVG)" },
            { value: "60 FPS", label: "Real-time Canvas Rendering" },
            { value: "< 50ms", label: "Dynamic Redirect Speed" }
        ],
        challenges: [
            "Generating crisp mathematical SVG vectors on-the-fly while supporting complex custom gradients and embedded central logos.",
            "Guaranteeing scan reliability and error correction thresholds across varying mobile camera qualities.",
            "Handling high-frequency dynamic redirect tracking without adding latency to the end-user."
        ],
        solutions: [
            "Created an optimized HTML5 Canvas and SVG drawing engine with real-time Reed-Solomon error correction feedback.",
            "Implemented dynamic short-link routing backed by Redis and PostgreSQL connection pooling.",
            "Designed a dark-mode first, studio-grade UI with live preview and multi-format export presets."
        ],
        architecture: "React frontend with custom WebGL/Canvas render hooks, communicating with an Express/Node.js API gateway connected to PostgreSQL for analytics and dynamic redirect metadata.",
        keyFeatures: [
            {
                title: "Custom Styling & Eye Patterns",
                description: "Extensive control over body dots, corner squares, color gradients, and brand logo embedding."
            },
            {
                title: "Lossless Vector Formats",
                description: "Instant export presets for SVG vector, high-DPI print-ready PNG, and lightweight web embeds."
            },
            {
                title: "Scan Analytics & Tracking",
                description: "Monitors daily scans, geo-distribution, browser agents, and conversion paths in real time."
            },
            {
                title: "Dynamic Target Switching",
                description: "Allows marketing administrators to alter the destination URL without reprinting physical collateral."
            }
        ],
        techDetails: {
            frontend: ["React.js", "Tailwind CSS", "HTML5 Canvas API", "Lucide React"],
            backend: ["Node.js", "Express.js", "RESTful API"],
            ai_ml: [],
            database: ["PostgreSQL", "Redis Caching"],
            devops: ["Docker", "Vercel", "GitHub Actions"]
        },
        codeSnippet: `export const generateCustomVectorQR = (payload, options) => {
    const matrix = QRCodeMatrix.create(payload, {
        errorCorrectionLevel: options.ecLevel || 'H',
        version: options.version || 4
    });
    const svgPath = renderVectorElements(matrix, {
        eyeShape: options.eyeShape,
        dotStyle: options.dotStyle,
        gradient: options.gradient
    });
    return exportAsSVG(svgPath, options.logoAttachment);
};`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    },
    {
        id: 3,
        slug: "tourism-management-sentiment-analysis",
        title: "Web & Android Tourism Management System with Sentiment Analysis for Wolaita Zone",
        subtitle: "Full-stack tourist ecosystem with Amharic/English NLP feedback analytics & GIS mapping.",
        category: "WEB & ANDROID",
        liveBadge: "17+ / WEB + ANDROID",
        metaFooter: "2024 / WEB + ANDROID",
        ctaText: "VIEW DETAILS",
        deviceType: "laptop",
        timeline: "5 Months / 2024",
        role: "Full-Stack & Mobile Developer",
        client: "Wolaita Zone Tourism Dept.",
        status: "Production Deployed",
        price: 0,
        image_url: "/projects/tourism-management.jpg",
        tech_stack: "REACT, FASTAPI (NLP), POSTGRESQL, FIREBASE / ANDROID",
        techBadges: ["REACT", "FASTAPI (NLP)", "POSTGRESQL", "FIREBASE / ANDROID"],
        description: "A full-stack tourist management platform developed for Wolaita Zone, Ethiopia, featuring interactive destination exploration, verified hospitality bookings, and machine learning sentiment analysis on traveler reviews.",
        overview: "A comprehensive digital tourism infrastructure engineered for regional tourism authorities and international travelers. Built to boost hospitality transparency and visitor engagement, the platform pairs an interactive React web portal with a native Android application. Behind the scenes, an integrated NLP model parses tourist reviews in real time to categorize public sentiment, pinpoint service gaps, and highlight regional attractions.",
        impactStats: [
            { value: "17+", label: "Destinations Mapped" },
            { value: "94.2%", label: "NLP Sentiment Accuracy" },
            { value: "4.8/5", label: "Tourist User Rating" },
            { value: "100%", label: "Mobile Responsive" }
        ],
        challenges: [
            "Accurately evaluating sentiment across localized vernacular, colloquial expressions, and multilingual feedback.",
            "Synchronizing bookings and inquiries between web dashboards and the native Android client.",
            "Designing an intuitive dashboard for non-technical municipal administrators to monitor hospitality KPIs."
        ],
        solutions: [
            "Trained and fine-tuned a multilingual transformer model capable of sentiment classification across dialect nuances.",
            "Architected a centralized PostgreSQL relational schema with role-based access control (Admins, Hotels, Tourists).",
            "Deployed an intuitive GIS mapping module with real-time filtering and sentiment breakdown charts."
        ],
        architecture: "Decoupled web and mobile clients interacting with a Python FastAPI microservice for NLP processing, and an Express/PostgreSQL core database server backed by Firebase real-time notifications.",
        keyFeatures: [
            {
                title: "Multilingual Sentiment Analytics",
                description: "Automatically analyzes reviews to compute vendor trust scores and municipal satisfaction indices."
            },
            {
                title: "Destination GIS Mapping",
                description: "Interactive guide covering cultural sites, historical landmarks, eco-tourism spots, and local lodges."
            },
            {
                title: "Android Native Mobile Companion",
                description: "Android application featuring offline bookmarking, GPS navigation, and direct hotel inquiry dispatch."
            },
            {
                title: "Administrative Control Center",
                description: "Comprehensive reporting dashboard for municipal staff to manage verified vendor listings and audit logs."
            }
        ],
        techDetails: {
            frontend: ["React.js", "Tailwind CSS", "Leaflet Maps", "Chart.js"],
            backend: ["FastAPI", "Python", "Node.js", "Express.js"],
            ai_ml: ["Hugging Face Transformers", "Scikit-Learn", "BERT Multilingual"],
            database: ["PostgreSQL", "Firebase Firestore"],
            devops: ["Docker", "Git", "Postman", "Vercel"]
        },
        codeSnippet: `@router.post("/analyze-review", response_model=SentimentResult)
async def analyze_tourist_feedback(review: ReviewSubmission):
    clean_text = preprocess_text(review.comment)
    tokens = tokenizer(clean_text, return_tensors="pt", truncation=True, max_length=256)
    
    with torch.no_grad():
        logits = sentiment_model(**tokens).logits
        probabilities = torch.softmax(logits, dim=1).squeeze()
    
    score = float(probabilities[1] - probabilities[0])
    label = "POSITIVE" if score > 0.2 else ("NEGATIVE" if score < -0.2 else "NEUTRAL")
    return SentimentResult(label=label, confidence=float(probabilities.max()), polarity=score)`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    },
    {
        id: 4,
        slug: "digital-menu-restaurant-management",
        title: "Digital Menu System for Hotel & Restaurant",
        subtitle: "Contactless digital dining platform with real-time kitchen order display & inventory management.",
        category: "RESTAURANT TECH",
        liveBadge: "HOSPITALITY TECH",
        metaFooter: "2024 / RESTAURANT TECH",
        ctaText: "SYSTEM OVERVIEW",
        deviceType: "tablet",
        timeline: "3 Months / 2024",
        role: "Full-Stack Developer",
        client: "Hospitality & Restaurant Group",
        status: "Production Ready",
        price: 0,
        image_url: "/projects/digital-menu.jpg",
        tech_stack: "REACT, TAILWIND CSS, POSTGRESQL, SOCKET.IO",
        techBadges: ["REACT", "TAILWIND CSS", "POSTGRESQL", "SOCKET.IO"],
        description: "Interactive food and hospitality order management system replacing traditional paper menus with contactless QR ordering, real-time kitchen display sync, live order status tracking, multilingual multi-currency support, and point-of-sale integration.",
        overview: "A sleek, contactless ordering and table management solution engineered for high-turnover dining establishments and hotel room services. Guests scan table-specific QR codes to browse rich visual menus with ingredient details, allergen filters, and dietary tags. Orders dispatch instantly to the kitchen display system (KDS) via WebSockets, eliminating wait-time and order discrepancies.",
        impactStats: [
            { value: "0 Waiters", label: "Needed for Initial Order" },
            { value: "35%", label: "Faster Table Turnover" },
            { value: "100%", label: "Paperless Operation" },
            { value: "< 200ms", label: "Real-time Order Sync" }
        ],
        challenges: [
            "Ensuring immediate, reliable kitchen ticket synchronization even under unstable restaurant Wi-Fi.",
            "Managing complex menu modifications, customizations, combo deals, and daily inventory depletion.",
            "Designing a seamless, app-free web experience that opens instantly without requiring user registration."
        ],
        solutions: [
            "Implemented resilient WebSocket communication with local fallback polling and sound alerts for kitchen staff.",
            "Constructed a dynamic modifier engine supporting nested toppings, spicy levels, and dietary exclusions.",
            "Optimized client bundle size for sub-second first contentful paint (FCP) on mobile cellular connections."
        ],
        architecture: "Lightweight React single-page guest app with Socket.io duplex communication to an Express backend, managing order states in PostgreSQL with Redis active cart sessions.",
        keyFeatures: [
            {
                title: "Contactless QR Ordering",
                description: "Zero installation required. Instant browser menu loading with automatic table identification."
            },
            {
                title: "Live Kitchen Display System (KDS)",
                description: "Color-coded tickets with preparation timers, audio alerts, and station routing (Bar, Grill, Cold Prep)."
            },
            {
                title: "Dynamic Menu & Modifier Control",
                description: "Live item 86ing (marking out of stock), time-based happy hour pricing, and multi-language support."
            },
            {
                title: "Analytics & Sales Dashboard",
                description: "Reports on popular menu items, peak hours, average preparation times, and server performance."
            }
        ],
        techDetails: {
            frontend: ["React.js", "Tailwind CSS", "Socket.io Client", "Framer Motion"],
            backend: ["Node.js", "Express.js", "Socket.io", "JWT Auth"],
            ai_ml: [],
            database: ["PostgreSQL", "Prisma ORM"],
            devops: ["Render", "Vercel", "Docker"]
        },
        codeSnippet: `io.on('connection', (socket) => {
    socket.on('submit_guest_order', async (orderData) => {
        const validatedOrder = await orderService.createOrder(orderData);
        io.to(\`station_\${validatedOrder.category}\`).emit('new_kitchen_ticket', {
            orderId: validatedOrder.id,
            table: validatedOrder.tableNumber,
            items: validatedOrder.items,
            timestamp: new Date().toISOString()
        });
        socket.emit('order_confirmed', { status: 'PREPARING', etaMinutes: 15 });
    });
});`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    },
    {
        id: 5,
        slug: "kids-learning-android-app",
        title: "Kids Learning Android App (KG Students)",
        subtitle: "Interactive phonics & early childhood educational application built with Kotlin and Firebase.",
        category: "MOBILE APP",
        liveBadge: "MOBILE APP",
        metaFooter: "2024 / ANDROID APPS",
        ctaText: "VIEW DETAILS",
        deviceType: "mobile",
        layout: "banner",
        timeline: "3 Months / 2024",
        role: "Mobile App Developer",
        client: "Early Childhood Education Initiative",
        status: "Production Ready",
        price: 0,
        image_url: "/projects/kidssoming-app.jpg",
        tech_stack: "APPS, KOTLIN, FIREBASE, ROOM DB",
        techBadges: ["APPS", "KOTLIN", "FIREBASE", "ROOM DB"],
        description: "A fun and interactive Android learning application designed for Kindergarten (KG) students to support early childhood education through interactive digital lessons, phonics audio, and gamified progress.",
        overview: "A delightful, child-centric Android educational application designed specifically for Kindergarten and early primary learners. Built in native Kotlin with Android Jetpack components, this application transforms foundational alphabet literacy, phonetic pronunciation, numbers, and basic cognitive puzzles into an engaging, gamified journey. The app works 100% offline with local Room DB storage while syncing achievements to Firebase when connectivity is available.",
        impactStats: [
            { value: "50+", label: "Interactive Lessons" },
            { value: "100%", label: "Offline Operational" },
            { value: "0", label: "Ads or External Tracking" },
            { value: "60 FPS", label: "Smooth Animation Engine" }
        ],
        challenges: [
            "Designing a zero-text, intuitive navigation system usable by toddlers and non-reading kindergarten students.",
            "Guaranteeing instant audio playback for phonetic letters without stutter or latency on low-end Android hardware.",
            "Complying with strict child privacy standards (COPPA principles) with zero intrusive tracking."
        ],
        solutions: [
            "Created large colorful touch targets with tactile haptic feedback and cheerful auditory cues.",
            "Engineered an efficient local audio caching pipeline utilizing Android SoundPool for zero-latency playback.",
            "Leveraged Android Jetpack Room DB for completely offline persistence of student quiz stars and unlocked rewards."
        ],
        architecture: "MVVM native Android architecture implemented with Kotlin Coroutines, Jetpack Navigation, SoundPool audio player, Room SQLite ORM, and Firebase Cloud Messaging for parental updates.",
        keyFeatures: [
            {
                title: "Phonics & Letter Tracing",
                description: "Multi-sensory letter drawing canvas with stroke detection and pronunciation voiceovers."
            },
            {
                title: "Gamified Quiz Rewards",
                description: "Interactive visual puzzles rewarding students with collectible stars, badges, and cheerful animations."
            },
            {
                title: "Complete Offline Availability",
                description: "All core educational modules, audio files, and illustrations are bundled for zero-data environments."
            },
            {
                title: "Parental Progress Overview",
                description: "Dedicated pin-protected dashboard allowing guardians to track completion rates and learning milestones."
            }
        ],
        techDetails: {
            frontend: ["Kotlin", "Android Jetpack", "XML / Material Design 3", "Lottie Animations"],
            backend: ["Firebase Auth", "Cloud Firestore"],
            ai_ml: [],
            database: ["Android Room DB (SQLite)"],
            devops: ["Android Studio", "Gradle", "Google Play Console"]
        },
        codeSnippet: `class PhonicsAudioPlayer(context: Context) {
    private val soundPool = SoundPool.Builder().setMaxStreams(4).build()
    private val soundMap = HashMap<String, Int>()

    fun loadPhonicsLibrary() {
        val assetManager = context.assets
        listOf("letter_a", "letter_b", "letter_c").forEach { soundName ->
            val descriptor = assetManager.openFd("audio/$soundName.mp3")
            soundMap[soundName] = soundPool.load(descriptor, 1)
        }
    }

    fun playLetterSound(letter: String) {
        soundMap[letter]?.let { soundId ->
            soundPool.play(soundId, 1.0f, 1.0f, 1, 0, 1.0f)
        }
    }
}`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    }
];

// Helper to reliably match database items to rich portfolio templates
export const matchProjectDetails = (dbItem) => {
    if (!dbItem) return null;
    const title = (dbItem.title || '').toLowerCase();
    const slug = (dbItem.slug || '').toLowerCase();
    const id = Number(dbItem.id);

    // 1. Direct slug match
    if (slug) {
        const bySlug = initialProjects.find(p => p.slug === slug);
        if (bySlug) return bySlug;
    }

    // 2. Semantic title keywords
    if (title.includes('kid') || title.includes('learn') || title.includes('kg') || title.includes('student')) {
        return initialProjects.find(p => p.slug === 'kids-learning-android-app');
    }
    if (title.includes('qr')) {
        return initialProjects.find(p => p.slug === 'qr-studio-generator-platform');
    }
    if (title.includes('tour') || title.includes('sentiment') || title.includes('wolaita') || title.includes('wolkite')) {
        return initialProjects.find(p => p.slug === 'tourism-management-sentiment-analysis');
    }
    if (title.includes('menu') || title.includes('restaurant') || title.includes('hotel') || title.includes('dining')) {
        return initialProjects.find(p => p.slug === 'digital-menu-restaurant-management');
    }
    if (title.includes('report') || title.includes('automation') || title.includes('weekly')) {
        return initialProjects.find(p => p.slug === 'weekly-report-automation');
    }

    // 3. Match by ID fallback
    const byId = initialProjects.find(p => p.id === id);
    if (byId) return byId;

    return null;
};

// Merges database rows with the 5 canonical featured projects in exact order
export const getMergedProjects = (dbProjects = []) => {
    if (!Array.isArray(dbProjects) || dbProjects.length === 0) {
        return initialProjects;
    }

    // Map each canonical project template with database overrides
    const mergedList = initialProjects.map(template => {
        const dbMatch = dbProjects.find(db => {
            const matched = matchProjectDetails(db);
            return matched && matched.slug === template.slug;
        });

        if (!dbMatch) return template;

        const rawImg = dbMatch.image_url;
        const isUnsplash = rawImg && rawImg.includes('unsplash.com');
        const isTallUpload = rawImg && (rawImg.includes('1770844') || rawImg.includes('1771012'));
        const finalImg = (!rawImg || isUnsplash || isTallUpload) ? template.image_url : rawImg;

        return {
            ...template,
            ...dbMatch,
            id: dbMatch.id || template.id,
            slug: template.slug,
            layout: template.layout,
            title: dbMatch.title || template.title,
            description: dbMatch.description || template.description,
            image_url: finalImg,
            tech_stack: dbMatch.tech_stack || template.tech_stack,
            github_url: dbMatch.github_url || template.github_url,
            demo_url: dbMatch.demo_url || template.demo_url,
            source_url: dbMatch.source_url || template.source_url
        };
    });

    // Also include any extra custom projects created in admin that don't match standard templates
    dbProjects.forEach(db => {
        const matched = matchProjectDetails(db);
        if (!matched) {
            mergedList.push({
                ...db,
                slug: db.slug || `project-${db.id}`,
                techBadges: (db.tech_stack || '').split(',').map(s => s.trim()).filter(Boolean)
            });
        }
    });

    return mergedList;
};

// Unambiguously resolves any project by id, slug, or keyword
export const resolveProject = (projectList, idParam) => {
    const list = Array.isArray(projectList) && projectList.length > 0 ? projectList : initialProjects;
    if (!idParam) return list[0];

    const needle = String(idParam).toLowerCase().trim();

    // 1. Direct slug match
    let match = list.find(p => p.slug && p.slug.toLowerCase() === needle);
    if (match) return match;

    // 2. Direct ID match
    match = list.find(p => String(p.id) === needle);
    if (match) return match;

    // 3. Keyword detection
    if (needle.includes('kid') || needle.includes('learn') || needle.includes('kg')) {
        return list.find(p => p.slug === 'kids-learning-android-app') || initialProjects.find(p => p.slug === 'kids-learning-android-app');
    }
    if (needle.includes('weekly') || needle.includes('report') || needle.includes('automation')) {
        return list.find(p => p.slug === 'weekly-report-automation') || initialProjects.find(p => p.slug === 'weekly-report-automation');
    }
    if (needle.includes('qr')) {
        return list.find(p => p.slug === 'qr-studio-generator-platform') || initialProjects.find(p => p.slug === 'qr-studio-generator-platform');
    }
    if (needle.includes('tour') || needle.includes('sentiment') || needle.includes('wolaita') || needle.includes('wolkite')) {
        return list.find(p => p.slug === 'tourism-management-sentiment-analysis') || initialProjects.find(p => p.slug === 'tourism-management-sentiment-analysis');
    }
    if (needle.includes('menu') || needle.includes('restaurant') || needle.includes('hotel') || needle.includes('dining')) {
        return list.find(p => p.slug === 'digital-menu-restaurant-management') || initialProjects.find(p => p.slug === 'digital-menu-restaurant-management');
    }

    // 4. Fuzzy title match
    match = list.find(p => {
        const titleSlug = (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return titleSlug.includes(needle) || needle.includes(titleSlug);
    });
    if (match) return match;

    return list[0];
};

export const initialBlogPosts = [
    {
        id: 1,
        title: "Building Scalable AI Systems with Node.js",
        content: "Explore how to integrate large language models into your backend architecture...",
        display_date: "2026-02-28",
        published_date: "2026-02-28",
        read_time: "5 MIN READ",
        image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 2,
        title: "Mastering Tailwind CSS for Complex Dashboards",
        content: "Advanced Tailwind CSS techniques for managing utility-first styles in enterprise applications...",
        display_date: "2026-02-15",
        published_date: "2026-02-15",
        read_time: "8 MIN READ",
        image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 3,
        title: "The Future of Full-Stack Development",
        content: "How AI-assisted coding is changing the landscape for software engineers in 2026...",
        display_date: "2026-02-01",
        published_date: "2026-02-01",
        read_time: "4 MIN READ",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000"
    }
];

export const aboutMe = {
    bio1: "I'm a Full-Stack Developer and AI Enthusiast passionate about software design and engineering. With 1+ years of experience in full-stack development, I build clean, scalable, and maintainable applications that deliver real-world impact and exceptional user experience.",
    bio2: "I believe great software is more than just code—it's an experience. My approach combines rigorous engineering principles with a designer's eye for detail. I specialize in transforming complex systems and AI-model outputs into intuitive, user-friendly interfaces—while ensuring every solution is scalable, ethical, and performance-driven.",
    yearsExperience: "1+",
    toolkit: {
        languages: ["Python", "JavaScript", "SQL (PostgreSQL)", "HTML/CSS"],
        frontend: ["React.js", "Tailwind CSS"],
        backend: ["Node.js", "Express (Node.js)"],
        other: ["Git", "Docker"]
    },
    education: {
        degree: "B.S. in Computer Science",
        institution: "Wolkite University",
        period: "2021 — 2025"
    }
};
