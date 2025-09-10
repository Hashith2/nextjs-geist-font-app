module.exports = {

"[project]/.next-internal/server/app/api/tours/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/reservations.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SAFARI_TOURS": (()=>SAFARI_TOURS),
    "checkAvailability": (()=>checkAvailability),
    "createReservation": (()=>createReservation),
    "generateReservationId": (()=>generateReservationId),
    "getAllReservations": (()=>getAllReservations),
    "getAllTours": (()=>getAllTours),
    "getReservationById": (()=>getReservationById),
    "getTourById": (()=>getTourById),
    "updatePaymentStatus": (()=>updatePaymentStatus),
    "updateReservationStatus": (()=>updateReservationStatus),
    "validateReservationData": (()=>validateReservationData)
});
const SAFARI_TOURS = [
    {
        id: 'classic-safari',
        name: 'Classic Safari Adventure',
        description: 'Experience the thrill of wildlife viewing in our comfortable 4x4 jeeps. Perfect for families and first-time safari goers.',
        duration: '3 hours',
        price: 150,
        maxPassengers: 6,
        features: [
            'Professional wildlife guide',
            'Complimentary refreshments',
            'Wildlife photography opportunities',
            'Safety equipment included'
        ],
        availableTimeSlots: [
            '06:00',
            '09:00',
            '14:00',
            '17:00'
        ]
    },
    {
        id: 'premium-safari',
        name: 'Premium Safari Experience',
        description: 'Luxury safari experience with exclusive access to premium wildlife areas and gourmet refreshments.',
        duration: '5 hours',
        price: 280,
        maxPassengers: 4,
        features: [
            'Expert naturalist guide',
            'Gourmet lunch included',
            'Premium binoculars provided',
            'Exclusive wildlife areas',
            'Professional photography service'
        ],
        availableTimeSlots: [
            '06:00',
            '11:00',
            '15:00'
        ]
    },
    {
        id: 'sunset-safari',
        name: 'Sunset Safari Special',
        description: 'Witness the magical African sunset while observing wildlife in their natural habitat.',
        duration: '4 hours',
        price: 200,
        maxPassengers: 6,
        features: [
            'Sunset viewing experience',
            'Evening wildlife activity',
            'Traditional refreshments',
            'Campfire storytelling'
        ],
        availableTimeSlots: [
            '15:30',
            '16:00'
        ]
    },
    {
        id: 'full-day-safari',
        name: 'Full Day Safari Expedition',
        description: 'Complete safari experience covering multiple wildlife zones with lunch and extensive game viewing.',
        duration: '8 hours',
        price: 450,
        maxPassengers: 6,
        features: [
            'Multiple wildlife zones',
            'Full meals included',
            'Extended game viewing',
            'Rest stops at scenic locations',
            'Comprehensive wildlife education'
        ],
        availableTimeSlots: [
            '06:00'
        ]
    }
];
// In-memory storage for reservations (in a real app, this would be a database)
let reservations = [];
function generateReservationId() {
    return 'RES-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}
function getTourById(tourId) {
    return SAFARI_TOURS.find((tour)=>tour.id === tourId);
}
function getAllTours() {
    return SAFARI_TOURS;
}
function createReservation(reservationData) {
    const reservation = {
        ...reservationData,
        id: generateReservationId(),
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString()
    };
    reservations.push(reservation);
    return reservation;
}
function getReservationById(id) {
    return reservations.find((reservation)=>reservation.id === id);
}
function getAllReservations() {
    return reservations;
}
function updateReservationStatus(id, status) {
    const reservation = reservations.find((r)=>r.id === id);
    if (reservation) {
        reservation.status = status;
        return true;
    }
    return false;
}
function updatePaymentStatus(id, paymentStatus) {
    const reservation = reservations.find((r)=>r.id === id);
    if (reservation) {
        reservation.paymentStatus = paymentStatus;
        return true;
    }
    return false;
}
function validateReservationData(data) {
    const errors = [];
    if (!data.tourId || !getTourById(data.tourId)) {
        errors.push('Invalid tour selection');
    }
    if (!data.customerName || data.customerName.trim().length < 2) {
        errors.push('Customer name must be at least 2 characters');
    }
    if (!data.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail)) {
        errors.push('Valid email address is required');
    }
    if (!data.customerPhone || data.customerPhone.trim().length < 10) {
        errors.push('Valid phone number is required');
    }
    if (!data.date || new Date(data.date) <= new Date()) {
        errors.push('Reservation date must be in the future');
    }
    if (!data.timeSlot) {
        errors.push('Time slot selection is required');
    }
    if (!data.passengers || data.passengers < 1) {
        errors.push('At least 1 passenger is required');
    }
    const tour = getTourById(data.tourId);
    if (tour && data.passengers > tour.maxPassengers) {
        errors.push(`Maximum ${tour.maxPassengers} passengers allowed for this tour`);
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
function checkAvailability(tourId, date, timeSlot) {
    // In a real system, this would check against actual bookings
    // For now, we'll simulate some basic availability logic
    const existingReservations = reservations.filter((r)=>r.tourId === tourId && r.date === date && r.timeSlot === timeSlot && r.status !== 'cancelled');
    const tour = getTourById(tourId);
    if (!tour) return false;
    // Simple availability check - allow up to 2 bookings per time slot
    return existingReservations.length < 2;
}
}}),
"[project]/src/app/api/tours/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reservations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/reservations.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const tourId = searchParams.get('id');
        if (tourId) {
            const tour = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reservations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTourById"])(tourId);
            if (!tour) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Tour not found'
                }, {
                    status: 404
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(tour);
        }
        const tours = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reservations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllTours"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(tours);
    } catch (error) {
        console.error('Error fetching tours:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__fc44a255._.js.map